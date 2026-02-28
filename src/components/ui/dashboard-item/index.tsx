import { AnnualIcon, HolidaysIcon } from '@assets';
import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { width } from '@utils/helpers/dimension';
import { LeaveByType } from '@utils/types/leave.type';
import React, { ReactNode } from 'react';
import { StyleSheet, ViewProps } from 'react-native';

const SCREEN_WIDTH = width;

const HORIZONTAL_PADDING = 16;
const GAP = 16;

const ITEM_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP * 2 - 0.00001) / 3;

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SOCIAL_INSURANCE = 'SOCIAL_INSURANCE',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER',
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
  [LeaveType.SOCIAL_INSURANCE]: {
    icon: <HolidaysIcon />,
    label: 'Social Insurance',
  },
  [LeaveType.UNPAID]: {
    icon: <HolidaysIcon />,
    label: 'Unpaid',
  },
  [LeaveType.OTHER]: {
    icon: <HolidaysIcon />,
    label: 'Other',
  },
};

interface IProps extends ViewProps {
  item: LeaveByType;
}

const DashboardItem = ({ item, ...props }: IProps) => {
  const { leaveType, usedHours, totalHours } = item;
  const { icon, label } = LeaveTypeMap[leaveType as LeaveType];

  const pad = (n: number | undefined) => {
    const num = Number(n);
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <View {...props} style={[styles.card, { width: ITEM_WIDTH }]}>
      {icon}
      <Text size={12} weight={600} color={colors.neutral.c900}>
        {label}
      </Text>
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Text size={30} weight={600} color={colors.neutral.c900}>
          {pad(usedHours ? usedHours / 8 : usedHours)}
        </Text>
        <View>
          <Text size={14} color={colors.neutral.c500}>
            /{pad(totalHours ? totalHours / 8 : totalHours)}
          </Text>
          <View height={6} />
        </View>
      </View>
    </View>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.blue.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
    height: 75,
    justifyContent: 'space-between',
  },
});
