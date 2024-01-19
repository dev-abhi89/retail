import notifee from '@notifee/react-native';
import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

export default function useNotification() {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    notifee.createChannel({
      id: 'rn-push-notification-channel-id-4-default-300',
      name: 'Default Channel',
    });
  }, []);
  return [];
}
