import Snackbar from 'react-native-snackbar';
import AppColors from '../common/AppColors';

export default function showMsg(message) {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: AppColors.white,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: AppColors.accentDarker,
    });
  }, 400);
}
