/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainContainer from './src/navigation/MainContainer';

AppRegistry.registerComponent(appName, () => MainContainer);
