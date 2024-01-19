import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';
import Dashboard from './dashboard/Reducer';
import Filter from './filter/Reducer';
import Images from './images/Reducer';

const persistConfig = {
  key: 'dashboard',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  filter: Filter,
  dashboard: persistReducer(persistConfig, Dashboard),
  images: persistReducer({...persistConfig, key: 'images'}, Images),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {ignoreActions: ['persist/PERSIST']},
    }),
});
export const persistor = persistStore(store);
