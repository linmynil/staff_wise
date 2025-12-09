import Text from '@components/core/text';
import View from '@components/core/view';
import { Account } from '@services/account';
import colors from '@utils/constants/colors';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfileInfo = ({ profile }: { profile: Account  }) => {
  const { username, accountRoles } = profile;
  return (
    <View style={styles.headerChildrenContainer}>
      <Image
        source={
          // avatar
          //   ? { uri: avatar }
          //   : 
            require('@assets/images/avatar-default.png')
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

export default ProfileInfo;

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
