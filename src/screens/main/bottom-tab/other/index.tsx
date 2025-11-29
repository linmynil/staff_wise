import { ArrowLogout, SadFace, SwapIcon, UserIdIcon } from '@assets';
import { Button, Text, useModal, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import OtherItem from '@components/ui/other-item';
import { authSlice } from '@redux/reducers/auth.slice';
import { useAppDispatch } from '@redux/selectors';
import colors from '@utils/constants/colors';
import axios from 'axios';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

const Other = () => {
  const dispatch = useAppDispatch();
  const { modalControl } = useModal();
  return (
    <MainLayout title="Other">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View flex={1} gap={12} paddingHorizontal={16} paddingVertical={24}>
          <OtherItem
            icon={<UserIdIcon />}
            title={'Thông tin cá nhân'}
            description={'Chỉnh sửa thông tin cá nhân của bạn'}
            onPress={() => {}}
          />
          <OtherItem
            icon={<SwapIcon />}
            title={'Đổi mật khẩu'}
            description={'Thay đổi mật khẩu đăng nhập App'}
            onPress={() => {}}
            isMissingMessage={'Tính năng đang phát triển'}
          />
          <Pressable
            onPress={() => {
              modalControl?.open({
                title: '',
                content: (
                  <View center gap={16}>
                    <SadFace color={colors.primary.default} />
                    <Text align="center">
                      Bạn có đồng ý đăng xuất khỏi ứng dụng không?
                    </Text>
                  </View>
                ),
                button1: (
                  <Button
                    title="Đồng ý"
                    onPress={async () => {
                      modalControl?.close();
                      axios.defaults.headers.common.Authorization = '';
                      dispatch(authSlice.actions.removeToken());
                    }}
                  />
                ),
                button2: (
                  <Button
                    title="Hủy"
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
                Đăng xuất
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
