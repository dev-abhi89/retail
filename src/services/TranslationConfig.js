import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'Apply Filters': 'Apply Filters',
        'Clear All Filters': 'Clear All Filters',
        Type: 'Type',
        Route: 'Route',
        Area: 'Area',
        Cancel: 'Cancel',
        Profile: 'Profile',
        'Switch language': 'Switch language',
        translate: 'translate',
        'No Data Found': 'No Data Found',
        'Search Stores': 'Search Stores',
        ADD: 'ADD',
        'No Image Selected': 'No Image Selected',
        Submit: 'Submit',
        'Images will be Uploaded.': 'Images will be Uploaded.',
        LOGIN: 'LOGIN',
        Password: 'Password',
        Email: 'Email',
        Logout:"Logout"
      },
    },
    hin: {
      translation: {
        'Apply Filters': 'फ़िल्टर लागू करें',
        'Clear All Filters': 'सभी फ़िल्टर साफ़ करें',
        Type: 'प्रकार',
        Route: 'मार्ग',
        Area: 'क्षेत्र',
        Cancel: 'रद्द करें',
        Profile: 'प्रोफ़ाइल',
        'Switch language': 'भाषा बदलें',
        translate: 'अनुवाद करें',
        'No Data Found': 'कोई डेटा नहीं मिला',
        'Search Stores': 'दुकानें खोजें',
        ADD: 'जोड़ें',
        'No Image Selected': 'कोई छवि नहीं चयनित',
        Submit: 'प्रस्तुत करें',
        'Images will be Uploaded.': 'छवियाँ अपलोड की जाएंगी।',
        LOGIN: 'लॉग इन करें',
        Password: 'पासवर्ड',
        Email: 'ईमेल',
        Logout: 'लॉगआउट',

      },
    },
  },
});
export default i18n;
