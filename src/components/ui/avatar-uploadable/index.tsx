import { CameraMini } from '@assets';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import Button from '@components/common/button';
import View from '@components/core/view';
import { setAvatar } from '@redux/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import colors from '@utils/constants/colors';
import { getData, storageKeys, storeData } from '@utils/helpers/asyncStorage.helper';
import { requestCameraPermission } from '@utils/helpers/permisson.helper';
import { Fragment, useEffect } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const AvatarUploadable = ({}: {}) => {
  const accountInfo = useAppSelector(state => state.account.accountInfo);
  const avatarKey = storageKeys.avatar + accountInfo?.id;

  const dispatch = useAppDispatch();
  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();
  const avatarUri = useAppSelector(state => state.auth.avatarUri);

  const loadAvatar = async () => {
    getData(avatarKey).then(res => dispatch(setAvatar(res || '')));
  };

  const saveAvatarUri = (uri: string) => {
    storeData(avatarKey, uri);
    dispatch(setAvatar(uri));
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <Fragment>
      <View>
        <Image
          style={styles.img_profile}
          source={avatarUri ? { uri: avatarUri } : require('@assets/images/avatar-default.png')}
          onError={() => {
            dispatch(setAvatar(''));
          }}
        />
        <Button.DefaultButton
          style={styles.camera_icon}
          onPress={() => {
            openBottomSheet2({
              content: (
                <View
                  center
                  paddingHorizontal={16}
                  gap={8}
                  width={'100%'}
                  padding={16}
                  marginBottom={16}
                >
                  <Button
                    type={Button.Type.outline}
                    title={'Take a photo'}
                    onPress={async () => {
                      const cameraPermission = await requestCameraPermission();
                      if (cameraPermission) {
                        closeBottomSheet2();
                        launchCamera({ mediaType: 'photo' }, ({ assets }: { assets?: any[] }) => {
                          const file = assets?.[0];
                          if (file?.uri) {
                            let data = {
                              name: file.fileName,
                              type: file.type,
                              uri:
                                Platform.OS === 'android'
                                  ? file.uri
                                  : file.uri.replace('file://', ''),
                            };
                            saveAvatarUri(data.uri);
                          }
                        });
                      } else {
                        Toast.show({
                          type: 'error',
                          text1: 'Please grant camera access to use this feature!',
                        });
                      }
                    }}
                  />
                  <Button
                    type={Button.Type.outline}
                    title={'Photo from the library'}
                    onPress={() => {
                      closeBottomSheet2();
                      launchImageLibrary(
                        { mediaType: 'photo' },
                        ({ assets }: { assets?: any[] }) => {
                          const file = assets?.[0];
                          if (file?.uri) {
                            let data = {
                              name: file.fileName,
                              type: file.type,
                              uri:
                                Platform.OS === 'android'
                                  ? file.uri
                                  : file.uri.replace('file://', ''),
                            };
                            saveAvatarUri(data.uri);
                          }
                        },
                      );
                    }}
                  />
                </View>
              ),
            });
          }}
        >
          <CameraMini />
        </Button.DefaultButton>
      </View>
    </Fragment>
  );
};

export default AvatarUploadable;

const styles = StyleSheet.create({
  img_profile: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  camera_icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 16,
  },
});
