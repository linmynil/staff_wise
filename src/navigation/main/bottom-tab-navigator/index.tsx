/* eslint-disable react/no-unstable-nested-components */
import { AddIcon, ChatIcon, MenuIcon } from '@assets';
import HomeIcon from '@assets/icons/HomeIcon';
import { View } from '@components';
import useGetAccountInfo from '@hooks/useGetAccountInfo';
import { TabRoutes } from '@navigation/routes';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ApplyLeave from '@screens/main/bottom-tab/apply-leave';
import ChatHome from '@screens/main/bottom-tab/chat';
import Home from '@screens/main/bottom-tab/home';
import Other from '@screens/main/bottom-tab/other';
import { Role } from '@services/account';
import colors from '@utils/constants/colors';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const MainTab = createBottomTabNavigator<any>();

const BottomTabNavigation = () => {
  const accountInfo = useGetAccountInfo();
  const role = accountInfo?.accountRoles?.[0]?.role?.name;
  const allowedTabs = ROLE_TABS_MAP[role || Role.EMPLOYEE];

  return (
    <MainTab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      initialRouteName={TabRoutes.HOME}
      tabBar={props => <TabBar {...props} />}
    >
      {allowedTabs.map(route => {
        const { name, component } = TAB_CONFIG[route];
        return <MainTab.Screen key={name} name={name} component={component} />;
      })}
    </MainTab.Navigator>
  );
};

const ROLE_TABS_MAP: Record<Role, TabRoutes[]> = {
  [Role.ADMIN]: [TabRoutes.HOME, TabRoutes.APPLY_LEAVE, TabRoutes.OTHER],
  [Role.EMPLOYEE]: [
    TabRoutes.HOME,
    TabRoutes.CHAT,
    TabRoutes.APPLY_LEAVE,
    TabRoutes.OTHER,
  ],
  [Role.CEO]: [TabRoutes.HOME, TabRoutes.CHAT, TabRoutes.OTHER],
  [Role.MANAGER]: [
    TabRoutes.HOME,
    TabRoutes.APPLY_LEAVE,
    TabRoutes.CHAT,
    TabRoutes.OTHER,
  ],
};

const TAB_CONFIG: { [key: string]: any } = {
  [TabRoutes.HOME]: {
    name: TabRoutes.HOME,
    component: Home,
    options: { headerShown: false },
    icon: HomeIcon,
    label: 'Home',
  },
  [TabRoutes.APPLY_LEAVE]: {
    name: TabRoutes.APPLY_LEAVE,
    component: ApplyLeave,
    icon: AddIcon,
    label: 'Apply Leave',
  },
  [TabRoutes.CHAT]: {
    name: TabRoutes.CHAT,
    component: ChatHome,
    icon: ChatIcon,
    label: 'Chat',
  },
  [TabRoutes.OTHER]: {
    name: TabRoutes.OTHER,
    component: Other,
    icon: MenuIcon,
    label: 'Other',
  },
};

const TabItem = ({
  name,
  onPress,
  isFocused,
}: {
  name: string;
  onPress: () => void;
  isFocused: boolean;
}) => {
  const IconElement = TAB_CONFIG[name].icon || HomeIcon;
  const icon = (
    <IconElement fill={isFocused ? colors.white : colors.neutral.c500} />
  );
  const label = TAB_CONFIG[name].label;
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const circleScale = useSharedValue(0);
  const labelTranslateY = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1.2);
      translateY.value = withSpring(-15);
      circleScale.value = withSpring(1);
      labelTranslateY.value = withSpring(-5);
    } else {
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
      circleScale.value = withSpring(0);
      labelTranslateY.value = withSpring(0);
    }
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    backgroundColor: isFocused ? colors.primary.default : colors.neutral.c200,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    backgroundColor: colors.neutral.c200,
    width: 64,
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    top: -26,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: labelTranslateY.value }],
  }));

  return (
    <Pressable onPress={onPress} style={styles.item}>
      {isFocused && <Animated.View style={animatedCircleStyle} />}
      <Animated.View style={animatedIconStyle}>{icon}</Animated.View>
      <Animated.Text
        style={[
          styles.text,
          isFocused && styles.activeText,
          animatedLabelStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TabItem
            key={route.key}
            name={route.name}
            onPress={onPress}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    height: 75,
    paddingBottom: 15,
    backgroundColor: colors.neutral.c200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 12,
    top: -4,
    fontWeight: '500',
    color: colors.neutral.c500,
  },
  activeText: {
    color: colors.primary.default,
  },
});
