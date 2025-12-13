import React from 'react';
import EmptyPage from './EmptyPage';
import AdminHome from './role-content/admin';
import ManagerHome from './role-content/manager';
import EmployeeHome from './role-content/employee';
import { Role } from '@utils/types/role.type';
import { useGetAccountInfo } from '@hooks';

const Home = () => {
  const accountInfo = useGetAccountInfo();
  const role = accountInfo?.accountRoles?.[0]?.role?.name;

  const ContentDetailMap: { [key: string]: any } = {
    [Role.EMPLOYEE]: EmployeeHome,
    [Role.MANAGER]: ManagerHome,
    [Role.ADMIN]: AdminHome,
  };
  const ContentPage = ContentDetailMap[role as string] || EmptyPage;

  return <ContentPage />;
};

export default Home;
