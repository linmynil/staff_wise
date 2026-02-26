import { OclockIcon } from '@assets';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import colors from '../../../utils/constants/colors';
import Text from '../../core/text';
import View from '../../core/view';
dayjs.extend(customParseFormat);

interface IProps extends Omit<DatePickerProps, 'onConfirm' | 'onCancel' | 'date' | 'mode'> {
  label?: string;
  min?: dayjs.ConfigType;
  max?: dayjs.ConfigType;
  error?: any;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  value?: string; // HH:mm
  placeholder?: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
}

const TimePicker = ({
  label = 'Time Picker',
  error,
  min,
  max,
  disabled = false,
  rightIcon,
  style,
  labelStyle,
  textStyle,
  value,
  placeholder,
  isRequired,
  onChange,
  ...props
}: IProps) => {
  const [visible, setVisible] = useState(false);

  const parsedTime = dayjs(value, 'HH:mm', true);

  const dateValue = parsedTime.isValid() ? parsedTime : dayjs();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleConfirm = (d: Date) => {
    setVisible(false);
    const result = dayjs(d).format('HH:mm');

    onChange && onChange(result);
  };

  const buildTimeWithToday = (time?: dayjs.ConfigType) => {
    if (!time) return undefined;

    const parsed = dayjs(time, 'HH:mm', true);
    if (!parsed.isValid()) return undefined;

    return dayjs().hour(parsed.hour()).minute(parsed.minute()).second(0).millisecond(0).toDate();
  };

  const minDate = buildTimeWithToday(min);
  const maxDate = buildTimeWithToday(max);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text color={colors.red.c500}>*</Text>}
        </Text>
      )}

      <Pressable
        onPress={handleVisible}
        disabled={disabled}
        style={[
          styles.datePicker,
          style,
          { borderColor: error ? colors.red.c600 : colors.neutral.c300 },
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.text, textStyle]}>
          {parsedTime.isValid() ? parsedTime.format('HH:mm') : placeholder}
        </Text>

        {rightIcon || <OclockIcon />}
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      <RNDatePicker
        modal
        theme="light"
        open={visible}
        mode="time"
        date={dateValue.toDate()}
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={handleConfirm}
        onCancel={handleVisible}
        locale="vi"
        confirmText="Chọn"
        cancelText="Huỷ"
        {...props}
      />
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 100,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral.c700,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: colors.neutral.c200,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.neutral.c900,
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.red.c600,
  },
  disabled: {
    opacity: 0.5,
  },
});
