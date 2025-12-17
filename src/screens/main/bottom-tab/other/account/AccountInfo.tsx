import { CameraMini, PenEdit } from '@assets';
import { Button, Text, View } from '@components';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import Divider from '@components/common/divider';
import MainLayout from '@components/layout/main-layout';
import Row from '@components/ui/row';
import { useGetAccountInfo, useGetEmployeeInfo } from '@hooks';
import { OtherRoutes } from '@navigation/routes';
import { setAvatar } from '@redux/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import colors from '@utils/constants/colors';
import {
  getData,
  storageKeys,
  storeData,
} from '@utils/helpers/asyncStorage.helper';
import { requestCameraPermission } from '@utils/helpers/permisson.helper';
import { AccountInfoView } from '@utils/types/account.type';
import { Role } from '@utils/types/role.type';

import React, { Fragment, useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const AccountInfo = ({ navigation }: any) => {
  const roles = useAppSelector(state => state.auth.roles);
  const isAdmin = roles?.includes(Role.ADMIN);

  const accountInfo = useGetAccountInfo();
  const employeeInfo = useGetEmployeeInfo();

  const info: AccountInfoView | undefined = isAdmin
    ? accountInfo && {
        id: accountInfo?.id,
        username: accountInfo?.username,
        email: accountInfo?.email,
        fullName: accountInfo?.employee?.fullName,
        phone: accountInfo?.employee?.phone,
      }
    : employeeInfo?.account && {
        id: employeeInfo?.account?.id,
        username: employeeInfo?.account?.username,
        email: employeeInfo?.account?.email,
        fullName: employeeInfo?.fullName,
        phone: employeeInfo?.phone,
      };

  return (
    <MainLayout
      title="Account Information"
      back={<MainLayout.BackToPreviousButton />}
    >
      <ScrollView style={styles.wrapper}>
        <View center gap={8}>
          <AvatarUploadable />
          <Text size={16} color={colors.neutral.c900} weight={600}>
            {info?.username?.toLocaleUpperCase()}
          </Text>
        </View>
        <View marginVertical={20} gap={4}>
          <View row space_between>
            <Text size={16} weight={600} color={colors.neutral.c900}>
              General Account Details
            </Text>
            <Button.IconButton
              icon={<PenEdit />}
              onPress={() => {
                navigation.navigate(OtherRoutes.OTHER_UPDATE_ACCOUNT_INFO);
              }}
            />
          </View>
          <View style={styles.info_container}>
            <Row title={'Username'} value={info?.username} />
            <Divider />
            <Row title={'Email'} value={info?.email} />
          </View>
        </View>
        <Divider />
        {/* <View marginVertical={20} gap={4}>
          <Text size={16} weight={600} color={colors.neutral.c900}>
            Roles & Permissions
          </Text>
          {roles?.map(item => {
            const role = item.role;

            return (
              <View key={item.id} style={styles.info_container}>
                <Row title={'Role'} value={role?.name} />
                <Divider />
                <Row title={'Permissions'} value={role?.description} />
              </View>
            );
          })}
        </View> */}
      </ScrollView>
    </MainLayout>
  );
};

export const AvatarUploadable = ({}: {}) => {
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
          source={
            avatarUri
              ? { uri: avatarUri }
              : require('@assets/images/avatar-default.png')
          }
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
                        launchCamera(
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
                      } else {
                        Toast.show({
                          type: 'error',
                          text1:
                            'Please grant camera access to use this feature!',
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

export default AccountInfo;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
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
  info_container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 4,
    shadowColor: colors.blue.c500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
