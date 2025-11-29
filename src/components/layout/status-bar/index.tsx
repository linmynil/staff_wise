import colors from '@utils/constants/colors';
import React, { Fragment } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  children?: React.ReactNode;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  statusBarColor?: string;
}
const StatusBarLayout = ({
  children,
  barStyle = 'light-content',
  backgroundColor = colors.background,
  statusBarColor = colors.primary.default,
}: IProps) => {
  const { top } = useSafeAreaInsets();
  const statusBarHeight = top;
  const statusBarStyle = {
    flex: 0,
    backgroundColor: statusBarColor,
    height: statusBarHeight,
  };
  const childrenStyle = {
    flex: 1,
    backgroundColor,
  };
  return (
    <Fragment>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={colors.transparent}
        translucent
      />
      <View style={statusBarStyle} />
      <View style={childrenStyle}>{children}</View>
    </Fragment>
  );
};

export default StatusBarLayout;
