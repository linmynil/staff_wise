import ArrowLeft from '@assets/icons/ArrowLeft';
import Text from '@components/core/text';
import View from '@components/core/view';
import { TabRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import colors from '@utils/constants/colors';
import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import StatusBarLayout from '../status-bar';

interface IProps extends ViewProps {
  title?: string;
  back?: React.ReactNode;
  next?: React.ReactNode;
  backgroundColor?: string;
  loading?: boolean;
  headerChildren?: React.ReactNode;
}

const MainLayout = ({
  title,
  children,
  back,
  next,
  backgroundColor,
  loading = false,
  headerChildren,
  ...props
}: IProps) => {
  return (
    <Fragment>
      {loading && (
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor={'rgba(0,0,0,0.5)'}
          center
          absolute
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000000}
        >
          <ActivityIndicator size="small" color={colors.primary.default} />
        </View>
      )}
      <StatusBarLayout
        barStyle="light-content"
        backgroundColor={backgroundColor || colors.background}
        statusBarColor={backgroundColor || colors.primary.default}
      >
        <View
          backgroundColor={
            headerChildren ? colors.primary.default : colors.background
          }
          style={{
            borderBottomStartRadius: headerChildren ? 48 : 0,
            borderBottomEndRadius: headerChildren ? 48 : 0,
          }}
        >
          {headerChildren && (
            <View style={styles.circleBackground}>
              <Image source={require('@assets/images/circle-background.png')} />
            </View>
          )}
          <View
            row
            space_between
            center
            paddingHorizontal={16}
            paddingVertical={8}
            style={{
              flex: 0,
              backgroundColor:
                backgroundColor || headerChildren
                  ? colors.transparent
                  : colors.primary.default,
            }}
            onStartShouldSetResponder={() => {
              Keyboard.dismiss();
              return false;
            }}
            {...props}
          >
            <View width={24}>{back}</View>
            <Text
              font="Inter"
              size={18}
              color={colors.white}
              weight={600}
              align="center"
              numberOfLines={2}
            >
              {title}
            </Text>
            <View width={24}>{next}</View>
          </View>
          {headerChildren}
        </View>
        <View
          flex={1}
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
            return false;
          }}
        >
          {children}
        </View>
      </StatusBarLayout>
    </Fragment>
  );
};

const BackToPreviousButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{ width: 36 }}
    >
      <ArrowLeft color={colors.white} />
    </TouchableOpacity>
  );
};

// const OpenDrawerButton = () => {
//   const navigation = useNavigation<any>();
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.openDrawer();
//       }}
//       style={{ width: 36 }}
//     >
//       <MenuIcon width={20} height={20} viewBox="0 0 512 512" />
//     </TouchableOpacity>
//   );
// };

const BackToHomeButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(TabRoutes.HOME as never);
      }}
    >
      <ArrowLeft color={colors.white} />
    </TouchableOpacity>
  );
};

MainLayout.BackToHomeButton = BackToHomeButton;
MainLayout.BackToPreviousButton = BackToPreviousButton;
// MainLayout.OpenDrawerButton = OpenDrawerButton;

export default MainLayout;

const styles = StyleSheet.create({
  circleBackground: {
    position: 'absolute',
    bottom: '-75%',
    left: 0,
  },
});
