import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AdminRoutes } from '@navigation/routes';
import ManageEmployee from '@screens/main/bottom-tab/home/role-content/admin/employee-management';
import ManageAccount from '@screens/main/bottom-tab/home/role-content/admin/account-mamagement';
import EmployeeDetail from '@screens/main/bottom-tab/home/role-content/admin/employee-management/EmployeeDetail';
import UpdateInfoEmployee from '@screens/main/bottom-tab/home/role-content/admin/employee-management/UpdateInfoEmployee';
import CreateAccountWithEmployee from '@screens/main/bottom-tab/home/role-content/admin/account-mamagement/CreateAccountWithEmployee';
import AccountDetail from '@screens/main/bottom-tab/home/role-content/admin/account-mamagement/AccountDetail';
import UpdateInfoAccount from '@screens/main/bottom-tab/home/role-content/admin/account-mamagement/UpdateInfoAccount';

const AdminStack = createNativeStackNavigator<any>();

const AdminNavigation = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AdminRoutes.ADMIN_MANAGE_EMPLOYEE}
    >
      <AdminStack.Screen name={AdminRoutes.ADMIN_MANAGE_EMPLOYEE} component={ManageEmployee} />
      <AdminStack.Screen name={AdminRoutes.ADMIN_MANAGE_ACCOUNT} component={ManageAccount} />
      {/*Employee */}
      <AdminStack.Screen name={AdminRoutes.ADMIN_EMPLOYEE_INFO} component={EmployeeDetail} />
      <AdminStack.Screen
        name={AdminRoutes.ADMIN_UPDATE_INFO_EMPLOYEE}
        component={UpdateInfoEmployee}
      />
      {/*Account */}
      <AdminStack.Screen
        name={AdminRoutes.ADMIN_CREATE_ACOUNT_WITH_EMPLOYEE}
        component={CreateAccountWithEmployee}
      />
      <AdminStack.Screen name={AdminRoutes.ADMIN_ACCOUNT_INFO} component={AccountDetail} />
      <AdminStack.Screen name={AdminRoutes.ADMIN_UPDATE_INFO} component={UpdateInfoAccount} />
    </AdminStack.Navigator>
  );
};

export default AdminNavigation;
