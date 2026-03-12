import Text from '@components/core/text';
import View from '@components/core/view';
import { useGetAccountInfo, useGetEmployeeInfo } from '@hooks';
import { useAppSelector } from '@redux/store';
import colors from '@utils/constants/colors';
import { Employee } from '@utils/types/employee.type';
import { Role } from '@utils/types/role.type';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfileInfoHeader = () => {
  // const roles = useAppSelector(state => state.auth.roles);
  // const isAdmin = roles?.includes(Role.ADMIN);
  // const avatarUri = useAppSelector(state => state.auth.avatarUri);
  // const info = isAdmin ? useGetAccountInfo() : useGetEmployeeInfo();
  // const displayName = isAdmin ? '' : `, ${(info as Employee)?.fullName}`;
  // const role = isAdmin ? Role.ADMIN : (info as Employee)?.phone;
  const roles = useAppSelector(state => state.auth.roles);
  const avatarUri = useAppSelector(state => state.auth.avatarUri);

  const isAdmin = roles?.includes(Role.ADMIN);

  const accountInfo = useGetAccountInfo();

  const employeeInfo = useGetEmployeeInfo();

  const info = isAdmin ? accountInfo : employeeInfo;

  const displayName = isAdmin ? '' : `, ${(info as Employee)?.fullName}`;
  const role = isAdmin ? Role.ADMIN : (info as Employee)?.phone;

  return (
    <View style={styles.headerChildrenContainer}>
      <Image
        source={avatarUri ? { uri: avatarUri } : require('@assets/images/avatar-default.png')}
        style={styles.avatar}
      />
      <View gap={2} center>
        <Text color={colors.white} size={16}>
          Welcome back {displayName}
        </Text>
        <Text color={colors.white} weight={600} size={16}>
          {role}
        </Text>
      </View>
    </View>
  );
};

export default ProfileInfoHeader;

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
