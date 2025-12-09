import { AnnualIcon } from '@assets';
import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { width } from '@utils/helpers/dimension';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const SCREEN_WIDTH = width;

const HORIZONTAL_PADDING = 16 * 2;
const GAP = 16;

const ITEM_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING - GAP) / 2.2;

export interface Management {
  id: string;
  title: string;
  time: string;
  onPress?: () => void;
}

interface IProps extends TouchableOpacityProps {
  item: Management;
}

const ManagementItem = ({ item, ...props }: IProps) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.7} style={styles.card}>
      <Text
        size={16}
        weight={600}
        color={colors.white}
        style={{ marginBottom: 4 }}
      >
        {item.title}
      </Text>

      <View style={styles.row}>
        <AnnualIcon
          color={colors.white}
          width={12}
          height={14}
          viewBox="0 0 17 19"
        />
        <Text size={12} color={colors.white}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ManagementItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.primary.default,
    minWidth: 110,
    justifyContent: 'center',
    shadowColor: colors.blue.c500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    width: ITEM_WIDTH,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
});
