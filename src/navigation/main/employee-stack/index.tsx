import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EmployeeRoutes } from '@navigation/routes';
import LeaveStatus from '@screens/main/bottom-tab/home/role-content/employee/LeaveStatus';
import AdditionalLeave from '@screens/main/bottom-tab/home/role-content/employee/AdditionalLeave';

const EmployeeStack = createNativeStackNavigator<any>();

const EmployeeNavigation = () => {
  return (
    <EmployeeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={EmployeeRoutes.EMPLOYEE_LEAVE_STATUS}
    >
      <EmployeeStack.Screen name={EmployeeRoutes.EMPLOYEE_LEAVE_STATUS} component={LeaveStatus} />
      <EmployeeStack.Screen
        name={EmployeeRoutes.EMPLOYEE_ADDITIONAL_LEAVE}
        component={AdditionalLeave}
      />
    </EmployeeStack.Navigator>
  );
};

export default EmployeeNavigation;
