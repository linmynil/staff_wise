import { ProfileResponse, Role } from '@utils/types/profile.type';
import React from 'react';
import EmptyPage from './EmptyPage';
import StaffHome from './role-content/staff';
import ManagerHome from './role-content/manager';
import AdminHome from './role-content/admin';

const profileDefault: ProfileResponse = {
  id: 1,
  name: 'Mỹ Linh',
  position: Role.STAFF,
  avatar: '',
};

const Home = () => {
  const { position } = profileDefault;
  const ContentDetailMap: { [key: string]: any } = {
    [Role.STAFF]: StaffHome,
    [Role.MANAGER]: ManagerHome,
    [Role.ADMIN]: AdminHome,
  };
  const ContentPage = ContentDetailMap[position as string] || EmptyPage;
  return <ContentPage />;
};

export default Home;
