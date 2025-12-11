import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StaffRoutes } from '@navigation/routes';
import LeaveStatus from '@screens/main/bottom-tab/home/role-content/staff/LeaveStatus';
import AdditionalLeave from '@screens/main/bottom-tab/home/role-content/staff/AdditionalLeave';

const StaffStack = createNativeStackNavigator<any>();

const StaffNavigation = () => {
  return (
    <StaffStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={StaffRoutes.STAFF_LEAVE_STATUS}
    >
      <StaffStack.Screen
        name={StaffRoutes.STAFF_LEAVE_STATUS}
        component={LeaveStatus}
      />
      <StaffStack.Screen
        name={StaffRoutes.STAFF_ADDITIONAL_LEAVE}
        component={AdditionalLeave}
      />
    </StaffStack.Navigator>
  );
};

export default StaffNavigation;
