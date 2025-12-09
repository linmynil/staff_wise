import { setAccountInfo } from '@redux/reducers/account.slice';
import { useAppDispatch, useAppSelector } from '@redux/selectors';
import { Role, useGetAccountInfoQuery } from '@services/account';
import React, { useEffect } from 'react';
import EmptyPage from './EmptyPage';
import AdminHome from './role-content/admin';
import ManagerHome from './role-content/manager';
import StaffHome from './role-content/staff';

const Home = () => {
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(state => state.account.accountInfo);

  const id = accountInfo?.id;

  const { data: account } = useGetAccountInfoQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  useEffect(() => {
    if (account) {
      dispatch(setAccountInfo(account));
    }
  }, [account]);

  const role = account?.accountRoles?.[0]?.role?.name;

  const ContentDetailMap: { [key: string]: any } = {
    [Role.EMPLOYEE]: StaffHome,
    [Role.MANAGER]: ManagerHome,
    [Role.ADMIN]: AdminHome,
  };
  const ContentPage = ContentDetailMap[role as string] || EmptyPage;

  return <ContentPage />;
};

export default Home;
