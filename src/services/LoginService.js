import auth from '@react-native-firebase/auth';
export default class Authservice {
  static login = (email, pass) => {
    return auth().signInWithEmailAndPassword(email, pass);
  };
  static loginWithNumber = number => {
    return auth().signInWithPhoneNumber(number);
  };
  static signup = async (email, pass) => {
    const usr = await auth().createUserWithEmailAndPassword(email, pass);
    //     if (usr != null) {
    //       await DatabaseServices.MakeData(
    //         '',
    //         '',
    //         'unfill',
    //         'unfill',
    //         auth().currentUser.uid,
    //       );
    //     }
    //     return usr;
  };
  static signout = () => {
    return auth().signOut();
  };
}
