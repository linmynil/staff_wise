import { Linking, PermissionsAndroid, Platform } from 'react-native';

export const requestStoragePermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true;
    }
    const androidVersion = Number(Platform.Version);
    if (androidVersion >= 33) {
      return true;
    }
    if (androidVersion < 33) {
      const permisson = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (permisson === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Linking.openSettings();
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true;
    }
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Linking.openSettings();
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
