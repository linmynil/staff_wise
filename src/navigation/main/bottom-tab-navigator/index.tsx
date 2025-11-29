/* eslint-disable react/no-unstable-nested-components */
import { AddIcon, ChatIcon, MenuIcon } from '@assets';
import HomeIcon from '@assets/icons/HomeIcon';
import { View } from '@components';
import { TabRoutes } from '@navigation/routes';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ApplyLeave from '@screens/main/bottom-tab/apply-leave';
import ChatHome from '@screens/main/bottom-tab/chat';
import Home from '@screens/main/bottom-tab/home';
import Other from '@screens/main/bottom-tab/other';
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
  return (
    <MainTab.Navigator
      screenOptions={{ headerShown: false,
      tabBarHideOnKeyboard: true,
       }}
      initialRouteName={TabRoutes.HOME}
      tabBar={props => <TabBar {...props} />}
    >
      <MainTab.Screen
        name={TabRoutes.HOME}
        component={Home}
        options={{ headerShown: false }}
      />
      <MainTab.Screen name={TabRoutes.APPLY_LEAVE} component={ApplyLeave} />
      <MainTab.Screen name={TabRoutes.CHAT} component={ChatHome} />
      <MainTab.Screen name={TabRoutes.OTHER} component={Other} />
    </MainTab.Navigator>
  );
};

const TabRoutesMap: { [key: string]: any } = {
  [TabRoutes.HOME]: {
    icon: HomeIcon,
    label: 'Home',
  },
  [TabRoutes.APPLY_LEAVE]: {
    icon: AddIcon,
    label: 'Apply Leave',
  },
  [TabRoutes.CHAT]: {
    icon: ChatIcon,
    label: 'Chat',
  },
  [TabRoutes.OTHER]: {
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
  const IconElement = TabRoutesMap[name].icon || HomeIcon;
  const icon = (
    <IconElement fill={isFocused ? colors.white : colors.neutral.c500} />
  );
  const label = TabRoutesMap[name].label;
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

// const styles = StyleSheet.create({
//   container: {
//     height: 64,
//     borderRadius: 32,
//     //backgroundColor: 'rgba(107, 125, 189, 0.15)',
//     backgroundColor: colors.neutral.c200,
//     position: 'absolute',
//     bottom: 20,
//     left: 16,
//     right: 16,
//     overflow: 'hidden',
//   },
//   item: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 32,
//     margin: 8,
//   },
// });
