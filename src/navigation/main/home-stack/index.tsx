import { HomeRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageAccount from '@screens/main/bottom-tab/home/features/account-mamagement';
import AccountDetail from '@screens/main/bottom-tab/home/features/account-mamagement/AccountDetail';
import CreateAccountWithEmployee from '@screens/main/bottom-tab/home/features/account-mamagement/CreateAccountWithEmployee';
import UpdateInfoAccount from '@screens/main/bottom-tab/home/features/account-mamagement/UpdateInfoAccount';
import ManageEmployee from '@screens/main/bottom-tab/home/features/employee-management';
import EmployeeDetail from '@screens/main/bottom-tab/home/features/employee-management/EmployeeDetail';
import UpdateInfoEmployee from '@screens/main/bottom-tab/home/features/employee-management/UpdateInfoEmployee';
import React from 'react';

const HomeStack = createNativeStackNavigator<any>();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={HomeRoutes.HOME_MANAGE_ACCOUNT}
    >
      {/*Account */}
      <HomeStack.Screen name={HomeRoutes.HOME_MANAGE_ACCOUNT} component={ManageAccount} />
      <HomeStack.Screen name={HomeRoutes.HOME_ACCOUNT_INFO} component={AccountDetail} />
      <HomeStack.Screen
        name={HomeRoutes.HOME_CREATE_ACOUNT_WITH_EMPLOYEE}
        component={CreateAccountWithEmployee}
      />
      <HomeStack.Screen name={HomeRoutes.HOME_UPDATE_INFO_ACCOUNT} component={UpdateInfoAccount} />

      {/*Employee */}
      <HomeStack.Screen name={HomeRoutes.HOME_MANAGE_EMPLOYEE} component={ManageEmployee} />
      <HomeStack.Screen name={HomeRoutes.HOME_EMPLOYEE_INFO} component={EmployeeDetail} />
      <HomeStack.Screen
        name={HomeRoutes.HOME_UPDATE_INFO_EMPLOYEE}
        component={UpdateInfoEmployee}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
