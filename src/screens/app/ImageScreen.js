import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import AppColors from '../../common/AppColors';
import DatabaseServices from '../../services/DatabaseService';
import storage from '@react-native-firebase/storage';
import showMsg from '../../services/snackBar';
import {useNavigation} from '@react-navigation/native';

const GalleryScreen = ({route}) => {
  const navigation = useNavigation();
  const shopID = route?.params.shop?.id;
  const [images, setImages] = useState([]);
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.uri}} style={styles.image} />
    </View>
  );
  const imgPicker = async () => {
    try {
      await launchCamera().then(i => {
        if (!i?.assets) return;
        setImages(prev => [...prev, i.assets[0]]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const uploadfunc = async img => {
    const imName = img.fileName;

    const ref = storage().ref().child('images').child(shopID).child(imName);
    await ref.putFile(img.uri).catch(e => {
      console.log(e);
    });
    try {
      const link = await ref.getDownloadURL();
      console.log(link);
      await DatabaseServices.uploadImage(link, shopID);
    } catch (e) {
      console.log(e);
    }
  };
  async function handelSubmit() {
    showMsg('Images will be Uploaded.');
    navigation.pop();
    for (const img of images) await uploadfunc(img);
    showMsg('Images Uploaded successfully');
  }
  return (
    <View style={styles.container}>
      {/* <AppBar title="Upload images" /> */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={imgPicker} style={styles.button}>
          <Text style={styles.buttonText}>{t('ADD')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={2}
        ListEmptyComponent={() => (
          <View style={styles.flatListContainer}>
            <Text style={styles.noImages}>{t('No Image Selected')}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          handelSubmit();
        }}
        style={[styles.button, styles.button2]}>
        <Text style={styles.buttonText}>{t('Submit')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  flatListContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 8,
  },
  noImages: {
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.secondaryText,
  },
  button: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
    backgroundColor: AppColors.primary,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  button2: {
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
  },
  imageContainer: {
    width: 200, // Width of each image + margin
    borderWidth: 1,
    borderColor: AppColors.secondaryBorder,
    margin: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
});

export default GalleryScreen;
