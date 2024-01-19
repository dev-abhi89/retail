import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MainContainer from './src/navigation/MainContainer';
import {persistor, store} from './src/redux/Strore';
import i18n from './src/services/TranslationConfig';

const initI18n = i18n;

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer />
      </PersistGate>
    </Provider>
  );
}
