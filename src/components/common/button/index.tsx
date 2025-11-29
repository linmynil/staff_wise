import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
} from 'react-native';
import Text from '../../core/text';
import colors from '@utils/constants/colors';

enum ButtonType {
  filled = 'filled',
  outline = 'outline',
  ghost = 'ghost',
  link = 'link',
}

interface IProps extends TouchableOpacityProps {
  title?: string;
  type?: ButtonType;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

interface DefaultButtonProps extends TouchableOpacityProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

interface IconButtonProps extends TouchableOpacityProps {
  icon?: ReactNode;
}

interface OutlineButtonProps extends TouchableOpacityProps {
  icon?: ReactNode;
  iconRight?: ReactNode;
  title?: string;
  color?: string;
  border?: boolean;
}

const Button = ({
  title = 'Button',
  onPress = () => {},
  type = ButtonType.filled,
  disabled = false,
  style,
  textStyle,
  loading = false,
  ...props
}: IProps) => {
  const isDisabled = disabled || loading;
  const buttonStyle = [
    styles.button,
    styles[type],
    isDisabled && styles.disabledButton,
    style,
  ];
  const textStyleCombined = [
    styles.text,
    styles[`${type}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            type === ButtonType.filled ? colors.white : colors.primary.default
          }
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const OutlineButton = ({
  icon,
  iconRight,
  title,
  color,
  ...props
}: OutlineButtonProps) => {
  const style: {} = [color && { borderColor: color }];
  const textStyle: {} = [color && { color: color }];
  return (
    <TouchableOpacity style={[styles.buttonOutlineStyle, style]} {...props}>
      {icon}
      {props.children}
      {title && (
        <Text style={[styles.textOfButtonOutlineStyle, textStyle]}>
          {title}
        </Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      {props.children}
      {icon}
    </TouchableOpacity>
  );
};

const DefaultButton = ({ title, titleStyle, ...props }: DefaultButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      {props.children}
      {title && <Text style={titleStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

Button.OutlineButton = OutlineButton;
Button.IconButton = IconButton;
Button.DefaultButton = DefaultButton;

Button.Type = ButtonType;

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.default,
  },
  filled: {
    backgroundColor: colors.primary.default,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.primary.default,
    backgroundColor: colors.white,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  link: {
    width: null,
    height: null,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.transparent,
  },
  disabledButton: {
    backgroundColor: colors.neutral.c200,
    borderWidth: 0,
    borderColor: colors.neutral.c700,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: colors.white,
  },
  filledText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary.default,
  },
  ghostText: {
    color: colors.primary.default,
  },
  linkText: {
    color: colors.blue.c500,
    textDecorationLine: 'underline',
  },
  buttonOutlineStyle: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary.default,
    paddingVertical: 6,
    paddingHorizontal: 6,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOfButtonOutlineStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.default,
  },
  textOfButtonTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.default,
  },
});
