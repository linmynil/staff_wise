import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { Employee } from '@utils/types/employee.type';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps extends TouchableOpacityProps {
  item: Employee;
}

const EmployeeItem = ({ item, ...props }: IProps) => {
  const { fullName, department, manager } = item;

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View gap={4}>
        <Text weight={600}>
          <Text>Fullname: </Text>
          {fullName}
        </Text>
        <Text weight={600}>
          <Text>Department: </Text>
          {department}
        </Text>
        <Text>
          Manager: <Text weight={600}>{!!manager && ` ${manager.fullName} - ${manager.id}`} </Text>
        </Text>
      </View>
      <Image style={styles.img_profile} source={require('@assets/images/avatar-default.png')} />
    </TouchableOpacity>
  );
};
export default EmployeeItem;

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
