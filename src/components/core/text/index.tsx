import {
  StyleSheet,
  Text as RNText,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import colors from '../../../utils/constants/colors';

interface IProps extends TextProps {
  font?: 'Inter' | 'Poppins';
  color?: string;
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  decoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  shrink?: boolean;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
}
const Text = ({
  children,
  font,
  color,
  size,
  weight,
  align,
  transform,
  decoration,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  height,
  maxWidth,
  maxHeight,
  shrink,
  lineHeight,
  style,
  ...props
}: IProps) => {
  const customStyle: {} = [
    font && { fontFamily: font },
    color && { color: color },
    size && { fontSize: size },
    weight && { fontWeight: weight },
    align && { textAlign: align },
    transform && { textTransform: transform },
    decoration && { textDecorationLine: decoration },
    padding && { padding: padding },
    paddingHorizontal && { paddingHorizontal: paddingHorizontal },
    paddingVertical && { paddingVertical: paddingVertical },
    paddingTop && { paddingTop: paddingTop },
    paddingBottom && { paddingBottom: paddingBottom },
    paddingLeft && { paddingLeft: paddingLeft },
    paddingRight && { paddingRight: paddingRight },
    margin && { margin: margin },
    marginHorizontal && { marginHorizontal: marginHorizontal },
    marginVertical && { marginVertical: marginVertical },
    marginTop && { marginTop: marginTop },
    marginBottom && { marginBottom: marginBottom },
    marginLeft && { marginLeft: marginLeft },
    marginRight && { marginRight: marginRight },
    width && { width: width },
    height && { height: height },
    maxWidth && { maxWidth: maxWidth },
    maxHeight && { maxHeight: maxHeight },
    shrink && { flexShrink: 1 },
    lineHeight && { lineHeight: lineHeight },
  ];

  return (
    <RNText style={[styles.default, customStyle, style]} {...props}>
      {children || ''}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
});
