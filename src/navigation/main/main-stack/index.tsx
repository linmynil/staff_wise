import { MainRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from '../bottom-tab-navigator';
import StaffNavigation from '../staff-stack';
import ChatNavigation from '../chat-stack';

const MainStack = createNativeStackNavigator<any>();

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MainRoutes.BOTTOM_TAB}
    >
      <MainStack.Screen
        name={MainRoutes.BOTTOM_TAB}
        component={BottomTabNavigation}
      />
      <MainStack.Screen name={MainRoutes.STAFF} component={StaffNavigation} />
      <MainStack.Screen
        name={MainRoutes.CHAT_MAIN}
        component={ChatNavigation}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
