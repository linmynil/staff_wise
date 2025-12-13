import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AdminRoutes } from '@navigation/routes';
import ManageEmployee from '@screens/main/bottom-tab/home/role-content/admin/ManageEmployee';

const AdminStack = createNativeStackNavigator<any>();

const AdminNavigation = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AdminRoutes.ADMIN_MANAGE_EMPLOYEE}
    >
      <AdminStack.Screen
        name={AdminRoutes.ADMIN_MANAGE_EMPLOYEE}
        component={ManageEmployee}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigation;
