import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { LeaveStatus, leaveStatusMap } from '@utils/constants/leave';
import { Leave } from '@utils/types/leave.type';
import dayjs from 'dayjs';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface IProps extends TouchableOpacityProps {
  item: Leave;
  isEmployee: boolean;
}

const LeaveItem = ({ item, isEmployee, ...props }: IProps) => {
  const { employee, leaveType, startDate, endDate, startTime, endTime, isFullDay, reason, status } =
    item;
  const formattedStart = dayjs(startDate).format('DD/MM/YYYY');
  const formattedEnd = dayjs(endDate).format('DD/MM/YYYY');

  const { color, backgroundColor, value } = leaveStatusMap[status as LeaveStatus];

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View gap={4}>
        {!isEmployee && (
          <Text weight={600}>
            {employee?.fullName} - code: {employee?.employeeCode}
          </Text>
        )}
        <Text size={13} weight={600}>
          {leaveType}
        </Text>
        <Text weight={400} size={12}>
          {formattedStart} - {formattedEnd} |{' '}
          {isFullDay === true ? '(Full day)' : `${startTime} - ${endTime}`}
        </Text>
        <Text weight={400} size={12}>
          {reason}
        </Text>
      </View>
      <View
        backgroundColor={backgroundColor}
        borderRadius={10}
        paddingVertical={6}
        paddingHorizontal={12}
      >
        <Text color={color}>{value}</Text>
      </View>
      {/* <Button
        title={
          status === 'PENDING'
            ? 'PENDING'
            : status === 'APPROVED'
            ? 'APPROVED'
            : status === 'REJECTED'
            ? 'REJECTED'
            : status === 'CANCEL'
            ? 'CANCEL'
            : 'PENDING'
        }
        style={{
          width: '35%',
          height: 40,
          backgroundColor:
            status === 'PENDING'
              ? 'yellow'
              : status === 'APPROVED'
              ? 'green'
              : status === 'REJECTED'
              ? 'red'
              : status === 'CANCEL'
              ? 'gray'
              : 'green',
        }}
        onPress={() => {}}
      /> */}
    </TouchableOpacity>
  );
};
export default LeaveItem;

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
