import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { ProfileResponse } from '@utils/types/profile.type';
import View from '@components/core/view';
import Text from '@components/core/text';
import colors from '@utils/constants/colors';

const ProfileInfo = ({ profile }: { profile: ProfileResponse }) => {
  const { name, avatar, position } = profile;
  return (
    <View style={styles.headerChildrenContainer}>
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require('@assets/images/avatar-default.png')
        }
        style={styles.avatar}
      />
      <View gap={2} center>
        <Text color={colors.white} size={16}>
          Welcome back, {name}
        </Text>
        <Text color={colors.white} weight={600} size={16}>
          {position}
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
