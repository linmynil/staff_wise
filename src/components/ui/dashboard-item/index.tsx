import { AnnualIcon, HolidaysIcon } from '@assets';
import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { width } from '@utils/helpers/dimension';
import React, { ReactNode } from 'react';
import { StyleSheet, ViewProps } from 'react-native';

const SCREEN_WIDTH = width;

const HORIZONTAL_PADDING = 16;
const GAP = 16;

const ITEM_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP * 2 - 0.00001) / 3;

export interface Dashboard {
  id: string;
  typeDate: string;
  date: string | number;
  totalDate: string | number;
}

interface IProps extends ViewProps {
  item: Dashboard;
}

export enum LeaveType {
  ANNUAL = 'Annual',
  HOLIDAYS = 'Holidays',
}

interface LeaveTypeMapProps {
  icon: ReactNode;
  label: string;
}

const LeaveTypeMap: Record<LeaveType, LeaveTypeMapProps> = {
  [LeaveType.ANNUAL]: {
    icon: <AnnualIcon />,
    label: 'Annual',
  },
  [LeaveType.HOLIDAYS]: {
    icon: <HolidaysIcon />,
    label: 'Holidays',
  },
};

const DashboardItem = ({ item, ...props }: IProps) => {
  const { typeDate, date, totalDate } = item;
  const { icon, label } = LeaveTypeMap[typeDate as LeaveType];

  const pad = (n: string | number) => {
    const num = Number(n);
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <View {...props} style={[styles.card, { width: ITEM_WIDTH }]}>
      {icon}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Text size={30} weight={600} color={colors.neutral.c900}>
          {pad(date)}
        </Text>
        <Text size={14} color={colors.neutral.c500}>
          /{pad(totalDate)}
        </Text>
      </View>

      <Text size={14} color={colors.neutral.c500}>
        {label}
      </Text>
    </View>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.blue.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
  },
});
