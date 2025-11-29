import {
  StyleSheet,
  TextInput as RNTextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import View from '../../core/view';
import Text from '../../core/text';
import React, { useState } from 'react';
import colors from '../../../utils/constants/colors';
import Button from '../button';
import { toCurrency } from '@utils/constants/string';
import { EyeOff, EyeOn } from '@assets';

enum InputType {
  text = 'text',
  phone = 'phone',
  email = 'email',
  number = 'number',
}
interface IProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  error?: string | string[] | boolean | undefined | any;
  type?: InputType;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  placeholderColor?: string;
  onChange?: (_: string) => void;
  isRequired?: boolean;
  isNumberHint?: boolean;
  isCurrency?: boolean;
}

const TypesMap: {
  [key: string]: TextInputProps['keyboardType'];
} = {
  phone: 'phone-pad',
  email: 'email-address',
  number: Platform.select({ ios: 'number-pad', android: 'numeric' }),
  default: 'default',
};

const TextInput = ({
  label = '',
  type = InputType.text,
  disabled = false,
  error,
  leftIcon,
  rightIcon,
  style,
  labelStyle,
  inputStyle,
  inputContainerStyle,
  onChange,
  placeholderColor,
  isRequired,
  value,
  isNumberHint,
  isCurrency,
  ...props
}: IProps) => {
  const keyboardType = TypesMap[type] || TypesMap.default;
  const [isShowHint, setIsShowHint] = React.useState(false);
  const format = isCurrency ? toCurrency : (t?: string) => t;
  const displayValue = format(value?.toString());

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[styles.label, labelStyle, { marginTop: isRequired ? 0 : 2 }]}
        >
          {label} {isRequired && <Text color={colors.red.c500}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle || {
            borderColor: error ? colors.red.c600 : colors.neutral.c300,
          },
          disabled && styles.disabled,
        ]}
      >
        {leftIcon}
        <RNTextInput
          style={[styles.input, inputStyle]}
          keyboardType={keyboardType}
          editable={!disabled}
          onChangeText={text => {
            setIsShowHint(true);
            onChange &&
              onChange(
                isCurrency
                  ? text.replaceAll(',', '').replaceAll('.', '')
                  : text,
              );
          }}
          placeholderTextColor={placeholderColor || colors.neutral.c500}
          value={displayValue}
          {...props}
        />
        {rightIcon}
      </View>

      {isNumberHint && isShowHint && (
        <Hints
          onChange={onChange}
          value={value}
          setIsShowHint={setIsShowHint}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const Hints = ({
  value,
  onChange,
  setIsShowHint,
}: {
  value?: string;
  onChange?: (_: string) => void;
  setIsShowHint: (_: boolean) => void;
}) => {
  let hints = [];
  let temp = Number.isNaN(value) ? 0 : Number(value);
  if (temp && temp > 0) {
    hints.push(temp * 1000, temp * 1000000, temp * 10000000);
  }
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hints.map(num => {
          return (
            <Button
              key={num}
              style={{
                height: 20,
                borderRadius: 4,
                paddingVertical: 0,
                paddingHorizontal: 6,
                marginHorizontal: 3,
                width: 'auto',
                backgroundColor: colors.neutral.c200,
              }}
              textStyle={{
                color: colors.neutral.c900,
                lineHeight: 20,
                fontSize: 10,
              }}
              onPress={() => {
                setIsShowHint(false);
                onChange && onChange(num.toString());
              }}
              title={toCurrency(num.toString())}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

TextInput.Type = InputType;

export default TextInput;

export const PasswordInput = ({ label, ...props }: IProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextInput
      label={label}
      secureTextEntry={!isPasswordVisible}
      rightIcon={
        <Pressable onPress={togglePasswordVisibility}>
          {!isPasswordVisible ? <EyeOn /> : <EyeOff />}
        </Pressable>
      }
      {...props}
    />
  );
};

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
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
