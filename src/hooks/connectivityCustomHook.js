import notifee from '@notifee/react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {updateImageStatus} from '../redux/images/Action';
import DatabaseServices from '../services/DatabaseService';

export default function useConnectivity() {
  const {isConnected} = useNetInfo();
  const {image_queue} = useSelector(state => state.images);
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);

  const uploadImages = async () => {
    if (running) return;
    setRunning(true);
    for (const img of image_queue) {
      if (img.status == false) {
        const status = await DatabaseServices.uploadfunc(img.url, img.shopId);
        if (status) {
          dispatch(updateImageStatus({index: img.url.fileName, status: false}));
          notifee.displayNotification({
            title: 'Image Uploaded',
            body: img.url.fileName,
            android: {
              channelId: 'rn-push-notification-channel-id-4-default-300',
              pressAction: {
                id: 'default',
              },
            },
          });
        }
      }
    }
    setRunning(false);
  };

  useEffect(() => {
    console.log('IsConnected', isConnected);
    if (isConnected) {
      uploadImages();
    }
  }, [isConnected, image_queue]);

  return [null];
}
