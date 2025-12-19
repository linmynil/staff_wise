import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import View from '@components/core/view';
import Text from '@components/core/text';
import colors from '@utils/constants/colors';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  icon?: React.ReactNode;
}

const HeaderAction = ({ title, actionLabel, onActionPress, icon }: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text weight={600} size={16}>
        {title}
      </Text>
      {actionLabel && icon && onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress} activeOpacity={0.8}>
          <Text color={colors.primary.default} size={12} weight={600}>
            {actionLabel}
          </Text>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderAction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary.default,
    gap: 8,
  },
});
