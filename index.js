/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigation/App';
import { name as appName } from './app.json';
import { OAUTH_WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

 GoogleSignin.configure({
     webClientId: OAUTH_WEB_CLIENT_ID, 
     offlineAccess: true,
    });

AppRegistry.registerComponent(appName, () => App);
