import useGetAccountInfo from '@hooks/useGetAccountInfo';
import { Role } from '@services/account';
import React from 'react';
import EmptyPage from './EmptyPage';
import AdminHome from './role-content/admin';
import ManagerHome from './role-content/manager';
import StaffHome from './role-content/staff';

const Home = () => {
  const accountInfo = useGetAccountInfo();
  const role = accountInfo?.accountRoles?.[0]?.role?.name;

  const ContentDetailMap: { [key: string]: any } = {
    [Role.EMPLOYEE]: StaffHome,
    [Role.MANAGER]: ManagerHome,
    [Role.ADMIN]: AdminHome,
  };
  const ContentPage = ContentDetailMap[role as string] || EmptyPage;

  return <ContentPage />;
};

export default Home;
