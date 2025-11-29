import Text from '@components/core/text';
import View from '@components/core/view';
import colors from '@utils/constants/colors';
import { height, width } from '@utils/helpers/dimension';
import React, { Fragment } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  ViewProps,
} from 'react-native';
import StatusBarLayout from '../status-bar';

interface IProps extends ViewProps {
  title?: string;
  back?: React.ReactNode;
  loading?: boolean;
}

const AuthLayout: React.FC<IProps> = ({
  title,
  back,
  children,
  loading,
  ...props
}) => {
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
        backgroundColor={colors.background}
        statusBarColor={colors.primary.default}
      >
        <View
          height={height * 0.35}
          style={styles.container}
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
            return false;
          }}
          {...props}
        >
          <View style={styles.circleBackground}>
            <Image source={require('@assets/images/circle-background.png')} />
          </View>
          <View style={[styles.circleLogo, styles.shadow]}>
            <Image
              style={styles.imgCircleLogo}
              source={require('@assets/images/logo.png')}
            />
            <Text color={colors.primary.default} weight={600} size={20}>
              Staffwise
            </Text>
          </View>

          <View padding={20}>
            {back}
            <Text font="Inter" size={40} color={colors.white} weight={600}>
              {title}
            </Text>
          </View>
        </View>
        <View
          flex={1}
          padding={20}
          paddingTop={width * 0.2}
          marginBottom={10}
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

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.primary.default,
    borderBottomStartRadius: 48,
    borderBottomEndRadius: 48,
  },
  circleBackground: {
    position: 'absolute',
    bottom: '-30%',
    left: 0,
  },
  circleLogo: {
    position: 'absolute',
    bottom: -width * 0.2,
    alignSelf: 'center',
    zIndex: 10,
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: colors.white,
    borderRadius: width * 0.2,
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imgCircleLogo: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: colors.primary.default,
    borderRadius: width * 0.1,
  },
});
