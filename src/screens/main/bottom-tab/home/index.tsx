import { setAvatar } from '@redux/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getData, storageKeys } from '@utils/helpers/asyncStorage.helper';
import { Role } from '@utils/types/role.type';
import React, { useEffect } from 'react';
import PermissionGuard from './components/PermissionGuard';
import AdminHome from './role-content/admin';
import EmployeeHome from './role-content/employee';

const Home = () => {
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(state => state.account.accountInfo);
  const avatarKey = storageKeys.avatar + accountInfo?.id;

  const loadAvatar = async () => {
    getData(avatarKey).then(res => dispatch(setAvatar(res || '')));
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <>
      <PermissionGuard
        excludeRoles={[Role.CEO, Role.EMPLOYEE, Role.HR, Role.MANAGER]}
      >
        <AdminHome />
      </PermissionGuard>
      <PermissionGuard
        excludeRoles={[Role.CEO, Role.ADMIN, Role.HR, Role.MANAGER]}
      >
        <EmployeeHome />
      </PermissionGuard>
    </>
  );
};

export default Home;
