import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { Account } from '@utils/types/account.type';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  item: Account;
}

const AccountItem = ({ item, ...props }: IProps) => {
  const { username, accountRoles, email } = item;

  const rolesText = accountRoles?.map(ar => ar.role.name).join(', ') || '';

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View gap={4}>
        <Text weight={600}>
          <Text>Username:</Text> {username}
        </Text>
        <Text weight={600}>
          <Text>Email:</Text> {email}
        </Text>
        <Text weight={600}>
          <Text>Role:</Text> {rolesText}
        </Text>
      </View>
      <Image
        style={styles.img_profile}
        source={require('@assets/images/avatar-default.png')}
      />
    </TouchableOpacity>
  );
};
export default AccountItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.neutral.c500,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img_profile: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
});
