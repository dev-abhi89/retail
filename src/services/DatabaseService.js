import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export default class DatabaseServices {
  uid = auth()?.currentUser?.uid;
  usr = firestore().collection('user');
  static getdata = async () => {
    return await firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          return data;
        }
      });
  };

  static getDashboardData = async ({page = 4}) => {
    const q = await firestore()
      .collection('user')
      .doc(auth()?.currentUser?.uid)
      .get();
    const user = q.data();
    const stores = [];

    const storesCollection = firestore()
      .collection('stores')
      .where(
        firestore.FieldPath.documentId(),
        'in',
        user?.stores.slice(page * 10 - 10, page * 10),
      );

    await storesCollection.get().then(storeQuerySnapshot => {
      storeQuerySnapshot.forEach(storeDoc => {
        const storeData = {...storeDoc.data(), id: storeDoc.id};

        stores.push(storeData);
      });
      return true;
    });
    return {
      response: stores,
      total_pages: Math.ceil(user.stores.length / 10),
      current_page: page,
    };
  };

  static searchStore = async (name = '', filters) => {
    try {
      const queryData = await firestore()
        .collection('user')
        .doc(auth()?.currentUser?.uid)
        .get();
      const user = queryData.data();
      const searched = [];
      let storeQueryFilter = firestore()
        .collection('stores')
        .orderBy('name')
        .startAt('U1_' + name.toUpperCase())
        .endAt('U1_' + name.toUpperCase() + '\uf8ff');
      if (filters) {
        const keys = ['area', 'route', 'type'];
        for (const k of keys) {
          if (filters[k])
            storeQueryFilter = storeQueryFilter.where(k, '==', filters[k]);
        }
      }

      await storeQueryFilter.get().then(snap => {
        snap.forEach(doc => {
          if (user.stores.includes(doc.id))
            searched.push({...doc.data(), id: doc.id});
        });
        return true;
      });
      return searched;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  static uploadImage = async (link, uid) => {
    try {
      await firestore()
        .collection('images')
        .add({storeId: uid, imageUrl: link, uploadOn: new Date()});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  static getAllStores = async () => {
    const q = await firestore()
      .collection('user')
      .doc(auth()?.currentUser?.uid)
      .get();
    const user = q.data();
    const stores = [];

    if (!user || !user.stores || user.stores.length === 0) {
      return [];
    }

    const storesCollection = firestore().collection('stores');
    const batchSize = 10;

    // Fetch stores in batches
    for (let i = 0; i < user.stores.length; i += batchSize) {
      const batch = user.stores.slice(i, i + batchSize);

      const storesQuery = storesCollection.where(
        firestore.FieldPath.documentId(),
        'in',
        batch,
      );

      await storesQuery.get().then(storeQuerySnapshot => {
        storeQuerySnapshot.forEach(storeDoc => {
          const storeData = {...storeDoc.data(), id: storeDoc.id};
          stores.push(storeData);
        });
        return true;
      });
    }

    return stores;
  };
  static uploadfunc = async (img, shopID) => {
    const imName = img.fileName;

    const ref = storage().ref().child('images').child(shopID).child(imName);
    await ref.putFile(img.uri).catch(e => {
      console.log(e);
    });
    try {
      const link = await ref.getDownloadURL();
      await DatabaseServices.uploadImage(link, shopID);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
