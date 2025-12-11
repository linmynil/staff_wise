import { ArrowLogout, SadFace, SwapIcon, UserIdIcon } from '@assets';
import { Button, Text, useModal, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import OtherItem from '@components/ui/other-item';
import { removeKey } from '@config/mmkv';
import { MainRoutes, OtherRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { authSlice, TokenType } from '@redux/reducers/auth.slice';
import { useAppDispatch } from '@redux/selectors';
import colors from '@utils/constants/colors';
import axios from 'axios';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

const Other = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { modalControl } = useModal();
  return (
    <MainLayout title="Other">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View flex={1} gap={12} paddingHorizontal={16} paddingVertical={24}>
          <OtherItem
            icon={<UserIdIcon />}
            title={'Account Infomation'}
            description={'Edit edit your information'}
            onPress={() => {
              navigation.navigate(MainRoutes.MAIN_OTHER, {
                screen: OtherRoutes.OTHER_ACCOUNT_INFO,
              });
            }}
          />
          <OtherItem
            icon={<SwapIcon />}
            title={'Change pasword'}
            description={'Change your app login password.'}
            onPress={() => {
              navigation.getParent().navigate(MainRoutes.MAIN_OTHER);
            }}
            // isMissingMessage={'Tính năng đang phát triển'}
          />
          <Pressable
            onPress={() => {
              modalControl?.open({
                title: '',
                content: (
                  <View center gap={16}>
                    <SadFace color={colors.primary.default} />
                    <Text align="center">
                      Do you agree to log out of the app?
                    </Text>
                  </View>
                ),
                button1: (
                  <Button
                    title="Agree"
                    onPress={async () => {
                      modalControl?.close();
                      removeKey(TokenType.ACCESS_TOKEN);
                      axios.defaults.headers.common.Authorization = '';
                      dispatch(authSlice.actions.removeToken());
                    }}
                  />
                ),
                button2: (
                  <Button
                    title="Cancel"
                    type={Button.Type.outline}
                    onPress={() => {
                      modalControl?.close();
                    }}
                  />
                ),
              });
            }}
          >
            <View height={45} row center gap={4} style={styles.btn_logout}>
              <ArrowLogout />
              <Text size={14} color={colors.red.c500} weight={600}>
                Log out
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Other;

const styles = StyleSheet.create({
  btn_logout: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
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
