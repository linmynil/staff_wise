import Text from '@components/core/text';
import View from '@components/core/view';
import { useAppSelector } from '@redux/store';
import colors from '@utils/constants/colors';
import { Account } from '@utils/types/account.type';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const AccountInfoHeader = ({ account }: { account: Account }) => {
  const { username, accountRoles } = account;
  const avatarUri = useAppSelector(state => state.auth.avatarUri);
  return (
    <View style={styles.headerChildrenContainer}>
      <Image
        source={
          avatarUri
            ? { uri: avatarUri }
            : require('@assets/images/avatar-default.png')
        }
        style={styles.avatar}
      />
      <View gap={2} center>
        <Text color={colors.white} size={16}>
          Welcome back, {username}
        </Text>
        <Text color={colors.white} weight={600} size={16}>
          {accountRoles?.[0]?.role?.name}
        </Text>
      </View>
    </View>
  );
};

export default AccountInfoHeader;

const styles = StyleSheet.create({
  headerChildrenContainer: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 72,
  },
});
