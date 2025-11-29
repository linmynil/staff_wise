import { ChevronRight, DocumentTextIcon, UserIdIcon } from '@assets';
import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface IProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  isMissingMessage?: string;
}

const OtherItem = ({
  icon,
  title,
  description,
  isMissingMessage,
  ...props
}: IProps) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      {isMissingMessage && (
        <View
          row
          verticalCenter
          backgroundColor={colors.orange.c200}
          paddingHorizontal={8}
          paddingVertical={4}
          borderRadius={4}
          gap={8}
        >
          <DocumentTextIcon />
          <Text size={12} color={colors.orange.c700}>
            {isMissingMessage}
          </Text>
        </View>
      )}
      <View row gap={12} center>
        {icon || <UserIdIcon />}
        <View gap={4} flex={1}>
          <Text size={14} weight={600} color={colors.neutral.c900}>
            {title || 'Title'}
          </Text>
          <Text size={14} color={colors.neutral.c500}>
            {description || 'Description'}
          </Text>
        </View>
        {/* {rightIcon} */}
        <ChevronRight />
      </View>
    </TouchableOpacity>
  );
};

export default OtherItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.blue.c500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    gap: 8,
  },
});
