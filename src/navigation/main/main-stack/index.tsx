import { MainRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from '../bottom-tab-navigator';
import EmployeeNavigation from '../employee-stack';
import ChatNavigation from '../chat-stack';
import OtherNavigation from '../other-stack';
import AdminNavigation from '../admin-stack';

const MainStack = createNativeStackNavigator<any>();

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MainRoutes.MAIN_BOTTOM_TAB}
    >
      <MainStack.Screen
        name={MainRoutes.MAIN_BOTTOM_TAB}
        component={BottomTabNavigation}
      />
      <MainStack.Screen
        name={MainRoutes.MAIN_EMPLOYEE}
        component={EmployeeNavigation}
      />
      <MainStack.Screen
        name={MainRoutes.MAIN_CHAT}
        component={ChatNavigation}
      />
      <MainStack.Screen
        name={MainRoutes.MAIN_OTHER}
        component={OtherNavigation}
      />
      <MainStack.Screen
        name={MainRoutes.MAIN_ADMIN}
        component={AdminNavigation}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
