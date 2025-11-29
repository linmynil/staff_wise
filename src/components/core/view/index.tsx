import React from 'react';
import { View as RNView, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  backgroundColor?: string;
  absolute?: boolean;
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
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  flex?: number;
  center?: boolean;
  row?: boolean;
  alignItems?: any;
  column?: boolean;
  space_between?: boolean;
  gap?: number;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  verticalCenter?: boolean;
  horizontalCenter?: boolean;
  overflow?: 'hidden' | 'visible' | 'scroll';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  aspectRatio?: number;
  opacity?: number;
  zIndex?: number;
}

const View = ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  backgroundColor,
  absolute,
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
  left,
  right,
  top,
  bottom,
  flex,
  center,
  row,
  column,
  space_between,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderTopWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderRightWidth,
  borderColor,
  borderStyle,
  verticalCenter,
  horizontalCenter,
  gap,
  overflow,
  alignSelf,
  zIndex,
  aspectRatio,
  opacity,
  style,
  alignItems,
  ...props
}: IProps) => {
  const customStyle: {} = [
    width && { width: typeof width === 'string' ? width : width },
    height && { height: typeof height === 'string' ? height : height },
    minWidth && { minWidth: typeof minWidth === 'string' ? minWidth : minWidth },
    minHeight && { minHeight: typeof minHeight === 'string' ? minHeight : minHeight },
    backgroundColor && { backgroundColor: backgroundColor },
    absolute && { position: 'absolute' },
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
    left && { left: left },
    right && { right: right },
    top && { top: top },
    bottom && { bottom: bottom },
    flex && { flex: flex },
    center && { justifyContent: 'center', alignItems: 'center' },
    space_between && { justifyContent: 'space-between' },
    row && { flexDirection: 'row' },
    gap && { gap: gap },
    column && { flexDirection: 'column' },
    verticalCenter && { alignItems: 'center' },
    horizontalCenter && { justifyContent: 'center' },
    borderRadius && { borderRadius: borderRadius },
    borderTopLeftRadius && { borderTopLeftRadius: borderTopLeftRadius },
    borderTopRightRadius && { borderTopRightRadius: borderTopRightRadius },
    borderBottomLeftRadius && { borderBottomLeftRadius: borderBottomLeftRadius },
    borderBottomRightRadius && { borderBottomRightRadius: borderBottomRightRadius },
    borderWidth && { borderWidth: borderWidth },
    borderTopWidth && { borderTopWidth: borderTopWidth },
    borderBottomWidth && { borderBottomWidth: borderBottomWidth },
    borderLeftWidth && { borderLeftWidth: borderLeftWidth },
    borderRightWidth && { borderRightWidth: borderRightWidth },
    borderColor && { borderColor: borderColor },
    borderStyle && { borderStyle: borderStyle },
    overflow && { overflow: overflow },
    alignSelf && { alignSelf: alignSelf },
    zIndex && { zIndex: zIndex },
    aspectRatio && { aspectRatio: aspectRatio },
    opacity && { opacity: opacity },
    alignItems && { alignItems: 'center' },
  ];

  return (
    <RNView style={[customStyle, style]} {...props}>
      {children}
    </RNView>
  );
};

export default View;
