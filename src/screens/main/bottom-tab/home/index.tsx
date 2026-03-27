import { PermissionGuard, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import DashboardItem from '@components/ui/dashboard-item';
import HeaderAction from '@components/ui/header-action';
import ManagementItem from '@components/ui/management-item';
import ProfileInfoHeader from '@components/ui/profile-info-header';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { setAvatar } from '@redux/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getData, storageKeys } from '@utils/helpers/asyncStorage.helper';
import { Role } from '@utils/types/role.type';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { useGetLeaveSummaryDashboardQuery } from '@services/leave';
import { ArrowRightIcon } from '@assets';

enum ManagementType {
  ACCOUNT = 'account',
  EMPLOYEE = 'employee',
  LEAVE_BALANCE = 'leave-balance',
  LEAVE_REQUESTS = 'leave-requests',
}

const managementOptions = [
  {
    id: '1',
    title: 'Account Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.ACCOUNT,
    roles: [Role.ADMIN],
  },
  {
    id: '2',
    title: 'Employee Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.EMPLOYEE,
    roles: [Role.HR],
  },
  {
    id: '3',
    title: 'Leave Balance Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.LEAVE_BALANCE,
    roles: [Role.HR],
  },
  {
    id: '4',
    title: 'List Leave Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.LEAVE_REQUESTS,
    roles: [Role.MANAGER, Role.CEO],
  },
];

const Home = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(state => state.account.accountInfo);
  const accountRoles = useAppSelector(state => state.auth.roles);

  const avatarKey = storageKeys.avatar + accountInfo?.id;

  const { data: dataGetLeaveSummary } = useGetLeaveSummaryDashboardQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const filteredManagementOptions = useMemo(() => {
    return managementOptions.filter(option =>
      option.roles.some(role => accountRoles.includes(role)),
    );
  }, [accountRoles]);

  const loadAvatar = async () => {
    getData(avatarKey).then(res => dispatch(setAvatar(res || '')));
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  const goScreenEmployeeManagemant = () => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_MANAGE_EMPLOYEE,
    });
  };
  const goScreenAccountManagement = () => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_MANAGE_ACCOUNT,
    });
  };
  const goScreenLeaveBalanceManagement = () => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_MANAGE_LEAVE_BALANCE,
    });
  };
  const goScreenLeaveRequestsManagement = () => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_MANAGE_LEAVE_REQUESTS,
    });
  };

  const handleManagement = (type: string) => {
    switch (type) {
      case ManagementType.EMPLOYEE:
        goScreenEmployeeManagemant();
        break;
      case ManagementType.ACCOUNT:
        goScreenAccountManagement();
        break;
      case ManagementType.LEAVE_BALANCE:
        goScreenLeaveBalanceManagement();
        break;
      case ManagementType.LEAVE_REQUESTS:
        goScreenLeaveRequestsManagement();
        break;
      default:
        break;
    }
  };

  const onLeaveStatus = () => {
    console.log('aaa');

    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.LEAVE_STATUS,
    });
  };

  return (
    <MainLayout title="Staff Wise" headerChildren={<ProfileInfoHeader />}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PermissionGuard excludeRoles={[Role.ADMIN]}>
            <HeaderAction
              title="Dashboard"
              actionLabel="Leave Status"
              icon={<ArrowRightIcon width={11} height={11} viewBox="0 0 11 11" />}
              onActionPress={onLeaveStatus}
            />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {dataGetLeaveSummary?.leaveByType?.map(item => (
                <DashboardItem key={`${item.leaveType}`} item={item} />
              ))}
            </View>
          </PermissionGuard>

          <PermissionGuard excludeRoles={[Role.EMPLOYEE]}>
            <HeaderAction title="Management" onActionPress={() => {}} />
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={filteredManagementOptions}
                keyExtractor={item => `${item.id}`}
                horizontal
                renderItem={({ item }) => (
                  <ManagementItem item={item} onPress={() => handleManagement(item.type)} />
                )}
                contentContainerStyle={{
                  gap: 16,
                }}
              />
            </View>
          </PermissionGuard>
          <View height={32}>
            <></>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
