import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from '../../core/text';
import View from '../../core/view';
import colors from '../../../utils/constants/colors';
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from '@assets';

interface IProps
  extends Omit<DatePickerProps, 'onConfirm' | 'onCancel' | 'date'> {
  label?: string;
  // defaultValue?: string;
  min?: dayjs.ConfigType;
  max?: dayjs.ConfigType;
  error?: any;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  dateTime?: boolean;
}

const DatePicker = ({
  label = 'Date Picker',
  // defaultValue,
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
  dateTime,
  ...props
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const date: Dayjs | undefined = value ? dayjs.utc(value) : undefined;
  const dateValue =
    date || (max ? dayjs.utc(max) : min ? dayjs.utc(min) : dayjs.utc());
  // const dateValue = date ? dayjs.utc(date) : min ? dayjs.utc(min) : max ? dayjs.utc(max) : dayjs.utc();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleConfirm = (d: Date) => {
    setVisible(!visible);
    const isToday = dayjs(d).utc().isSame(dayjs(), 'day');
    const result = dateTime
      ? dayjs(isToday ? dayjs().utc(true) : d).toISOString()
      : dayjs(d).format('YYYY-MM-DD');
    onChange && onChange(result);
  };

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
        {date ? (
          <Text style={[styles.text, textStyle]}>
            {date?.format('DD/MM/YYYY')}
          </Text>
        ) : (
          <Text
            style={[styles.text, textStyle, { color: colors.neutral.c300 }]}
          >
            {placeholder || ''}
          </Text>
        )}
        {rightIcon || <Calendar />}
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}
      <RNDatePicker
        modal={true}
        theme={'light'}
        open={visible}
        mode={'date'}
        date={new Date(dateValue.format('YYYY-MM-DD'))}
        title={null}
        {...(min && { minimumDate: new Date(dayjs(min).format('YYYY-MM-DD')) })}
        {...(max && { maximumDate: new Date(dayjs(max).format('YYYY-MM-DD')) })}
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

export default DatePicker;

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
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
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
