import { FilterIcon } from '@assets';
import { Button, EmptyData, Text, View } from '@components';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import DatePicker from '@components/common/date-picker';
import SelectBox, { SelectOption } from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import LeaveItem from '@components/ui/leave-item';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useGetEmployeesNoPaginationQuery } from '@services/employee';
import {
  useApprovePendingLeaveRequestMutation,
  useGetLeavesQuery,
  useLazyGetLeaveDetailQuery,
  useRejectPendingLeaveRequestMutation,
} from '@services/leave';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import {
  LeaveStatus as TypeLeaveStatus,
  leaveStatusMap,
  leaveStatusOptions,
  leaveTypeOptions,
  roleForGetEmployee,
} from '@utils/constants/leave';
import { height } from '@utils/helpers/dimension';
import { GetLeaveRequest, Leave } from '@utils/types/leave.type';
import { ErrorAPI } from '@utils/types/other.type';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

interface FilterBottomSheetValue {
  status?: string;
  leaveType?: string;
  employeeId?: number;
  fromDate?: string;
  toDate?: string;
}

const initialQuery: GetLeaveRequest = {
  page: 1,
  limit: LIMIT,
  status: undefined,
  leaveType: undefined,
  employeeId: undefined as unknown as number,
  fromDate: undefined,
  toDate: undefined,
};

const ListLeave = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(state => state.auth.roles ?? []);
  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();
  const [query, setQuery] = useState(initialQuery);
  // const [searchText, setSearchText] = useState('');
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const onEndReachedCalledDuringMomentum = React.useRef(true);

  const { data: dataGetLeaves, isFetching: isFetchingLeaves } = useGetLeavesQuery(
    {
      ...query,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const checkRole = roles.some(item => roleForGetEmployee.includes(item));

  const { data: dataGetEmployeesNoPagination } = useGetEmployeesNoPaginationQuery(
    {},
    {
      skip: !checkRole,
      refetchOnMountOrArgChange: true,
    },
  );

  const [getLeaveDetail] = useLazyGetLeaveDetailQuery();
  const [rejectLeave, { isLoading: isLoadingRejectLeave }] = useRejectPendingLeaveRequestMutation();
  const [approveLeave, { isLoading: isLoadingApproveLeave }] =
    useApprovePendingLeaveRequestMutation();
  const employeesOptions = dataGetEmployeesNoPagination?.map(employee => ({
    value: employee?.id?.toString(),
    label: `${employee?.fullName} - ${
      employee?.employeeCode ? employee?.employeeCode : employee?.id
    }`,
  }));

  employeesOptions?.unshift({
    value: '-1',
    label: 'Select a employee',
  });

  useEffect(() => {
    if (!dataGetLeaves?.data) return;

    if (query.page === 1) {
      setLeaves(dataGetLeaves?.data);
    } else {
      setLeaves(prev => [...prev, ...dataGetLeaves?.data]);
    }
    setHasMore(dataGetLeaves?.data?.length === LIMIT);
  }, [dataGetLeaves]);

  useEffect(() => {
    if (!dataGetLeaves?.data) return;

    if (query.page === 1) {
      setLeaves(dataGetLeaves?.data.filter(l => l.status === 'PENDING'));
    } else {
      setLeaves(prev => [...prev, ...dataGetLeaves?.data.filter(l => l.status === 'PENDING')]);
    }
    setHasMore(dataGetLeaves?.data?.filter(l => l.status === 'PENDING').length === LIMIT);
  }, [dataGetLeaves]);
  // const debouncedSearch = useDebouncedCallback((value: string) => {
  //   setHasMore(true);
  //   setQuery(prev => ({
  //     ...prev,
  //     page: 1,
  //     limit: LIMIT,
  //     search: value,
  //   }));
  // }, 400);

  const loadMore = () => {
    if (isFetchingLeaves || !hasMore) return;
    setQuery(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const onRefresh = () => {
    // setSearchText('');
    setQuery(initialQuery);
    setTimeout(() => {
      setHasMore(true);
    }, 0);
  };

  const handleApplyFilter = (filter: FilterBottomSheetValue) => {
    setQuery(prev => ({
      ...prev,
      page: 1,
      status: filter?.status === '_' ? undefined : filter?.status,
      leaveType: filter?.leaveType === '_' ? undefined : filter?.leaveType,
      fromDate: filter?.fromDate ? filter?.fromDate : undefined,
      toDate: filter?.toDate ? filter?.toDate : undefined,
    }));

    closeBottomSheet2();
  };

  const showBottomFilter = () => {
    Keyboard.dismiss();
    openBottomSheet2({
      snapPoints: [height * 0.7, height * 0.85],
      fixSnapPoints: true,
      content: (
        <LeaveFilterContent
          defaultValueFilter={query}
          employeesOptions={employeesOptions}
          onDone={handleApplyFilter}
          checkRole={checkRole}
        />
      ),
    });
  };

  const openLeaveDetail = async (id: number) => {
    Keyboard.dismiss();
    await getLeaveDetail(id)
      .unwrap()
      .then(res => {
        openBottomSheet2({
          fixSnapPoints: true,
          content: (
            <LeaveDetailContent
              detail={res}
              isLoadingApprove={isLoadingApproveLeave}
              isLoadingReject={isLoadingRejectLeave}
              onApprove={handleApproveLeave}
              onReject={handleRejectLeave}
            />
          ),
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'An error occurred. Please try again!',
        });
      });
  };

  const handleApproveLeave = (id: number) => {
    console.log('id', id);
    approveLeave(id)
      .then(res => {
        const { data, error } = res || {};
        console.log(data);

        if (!error) {
          Toast.show({
            type: 'success',
            text1: 'Approve leave success',
          });
          dispatch(baseAPI.util.invalidateTags([tagTypes.Leave]));
        } else {
          const message = (error as ErrorAPI)?.data?.message;
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'An error occurred, please try again.',
        });
      });
    closeBottomSheet2();
  };
  const handleRejectLeave = (id: number) => {
    console.log('id', id);
    rejectLeave(id)
      .then(res => {
        const { data, error } = res || {};
        console.log(data);

        if (!error) {
          Toast.show({
            type: 'success',
            text1: 'Reject leave success',
          });
          dispatch(baseAPI.util.invalidateTags([tagTypes.Leave]));
        } else {
          const message = (error as ErrorAPI)?.data?.message;
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'An error occurred, please try again.',
        });
      });
    closeBottomSheet2();
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Leave status"
      next={
        <FilterIcon fill={colors.white} onPress={showBottomFilter} />
        // <View>
        //   <Button.IconButton
        //     icon={<FilterIcon />}
        //     style={styles.filterIcon}
        //     onPress={showBottomFilter}
        //   />
        // </View>
      }
    >
      <View style={styles.container}>
        {/* <View row space_between center gap={10}>
          <View flex={1}>
            <TextInput
              inputContainerStyle={{ borderColor: colors.neutral.c500 }}
              placeholder="Search Employee"
              leftIcon={<SearchIcon />}
              value={searchText}
              onChange={value => {
                setSearchText(value);
                debouncedSearch(value);
              }}
            />
          </View>
          <Button.IconButton
            icon={<FilterIcon />}
            style={styles.filterIcon}
            onPress={showBottomFilter}
          />
        </View> */}
        <FlatList
          refreshControl={<RefreshControl refreshing={isFetchingLeaves} onRefresh={onRefresh} />}
          keyExtractor={item => item?.id?.toString()}
          data={leaves}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.containerFlatlist, {}]}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (onEndReachedCalledDuringMomentum.current) return;
            loadMore();
            onEndReachedCalledDuringMomentum.current = true;
          }}
          onEndReachedThreshold={0.05}
          renderItem={({ item }) => (
            <LeaveItem item={item} isEmployee={false} onPress={() => openLeaveDetail(item?.id)} />
          )}
          ListEmptyComponent={isFetchingLeaves ? <></> : <EmptyData title="Leave is empty" />}
        />
      </View>
    </MainLayout>
  );
};

interface LeaveFilterContentProps {
  defaultValueFilter: GetLeaveRequest;
  employeesOptions?: SelectOption[];
  checkRole: Boolean;
  onDone: (filter: FilterBottomSheetValue) => void;
}

const LeaveFilterContent: React.FC<LeaveFilterContentProps> = ({
  defaultValueFilter,
  employeesOptions,
  checkRole,
  onDone,
}) => {
  const { status, leaveType, employeeId, fromDate, toDate } = defaultValueFilter;
  const [filterBottom, setFilterBottom] = useState({
    status: status || '_',
    leaveType: leaveType || '_',
    employeeId: employeeId || (undefined as unknown as number),
    fromDate: fromDate,
    toDate: toDate,
  });
  return (
    <View
      flex={1}
      paddingHorizontal={16}
      gap={16}
      paddingTop={8}
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return false;
      }}
    >
      <View gap={12}>
        <Text weight={600} size={20} style={{ textAlign: 'center' }}>
          Leave Filter
        </Text>
        <SelectBox
          label="Leave type"
          placeholder="Select leave type"
          searchPlaceholder="Enter leave type"
          searchLabel="Manager leave type"
          options={leaveTypeOptions}
          value={filterBottom?.leaveType?.toString() ?? ''}
          onChange={l => setFilterBottom(prev => ({ ...prev, leaveType: l }))}
        />
        <SelectBox
          label="Status"
          placeholder="Select a status"
          searchPlaceholder="Enter status leave"
          searchLabel="Status leave"
          options={leaveStatusOptions}
          value={filterBottom?.status?.toString() ?? ''}
          onChange={v => setFilterBottom(prev => ({ ...prev, status: v }))}
        />
        {checkRole && (
          <SelectBox
            label="Employee"
            placeholder="Select a employee"
            searchPlaceholder="Enter employee name"
            searchLabel="Employee name"
            options={employeesOptions}
            value={filterBottom.employeeId?.toString() ?? ''}
            onChange={id => setFilterBottom(prev => ({ ...prev, employeeId: id }))}
          />
        )}
        <DatePicker
          placeholder="Select start day"
          label="Start day"
          value={filterBottom.fromDate?.toString() ?? ''}
          onChange={v => setFilterBottom(prev => ({ ...prev, fromDate: v }))}
          resetIcon
        />
        <DatePicker
          placeholder="Select end day"
          label="End day"
          min={filterBottom?.fromDate ? dayjs(filterBottom?.fromDate) : undefined}
          value={filterBottom.toDate?.toString() ?? ''}
          onChange={v => setFilterBottom(prev => ({ ...prev, toDate: v }))}
          resetIcon
        />
      </View>

      <Button title="Apply" onPress={() => onDone(filterBottom)} />
    </View>
  );
};

interface DetailLeaveRequestProps {
  detail: Leave;
  onReject: (id: number) => void;
  onApprove: (id: number) => void;
  isLoadingReject: boolean;
  isLoadingApprove: boolean;
}

const LeaveDetailContent = (props: DetailLeaveRequestProps) => {
  const { detail, onApprove, onReject, isLoadingApprove, isLoadingReject } = props;
  const {
    id,
    status,
    leaveType,
    startDate,
    endDate,
    isFullDay,
    startTime,
    endTime,
    employee,
    reason,
  } = detail;
  const { color, backgroundColor, value } = leaveStatusMap[status as TypeLeaveStatus];
  const formattedStart = dayjs(startDate).format('DD/MM/YYYY');
  const formattedEnd = dayjs(endDate).format('DD/MM/YYYY');
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        gap: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text weight={600} size={20} style={{ textAlign: 'center' }}>
        Detail Leave
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View backgroundColor={backgroundColor} borderRadius={8} paddingVertical={12}>
          <Text
            color={color}
            size={20}
            style={{
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {value}
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'space-between',
            paddingVertical: '10%',
          }}
        >
          <View
            style={{
              flex: 0.2,
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <Text weight={600}>Leave Type:</Text>
            <Text weight={600} size={18}>
              {leaveType}
            </Text>
            <Text>
              {formattedStart} - {formattedEnd}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              paddingBottom: 30,
            }}
          >
            <Text weight={600}>Leave Period:</Text>
            <Text>{isFullDay ? 'Full Day' : `${startTime || ''} - ${endTime || ''}`}</Text>
          </View>

          <View>
            <Text weight={600}>Sender: {employee?.fullName}</Text>
            <Text weight={600}>Reason:</Text>
            <Text>{reason || '...'}</Text>
          </View>
        </View>
      </ScrollView>

      <View row gap={3}>
        <Button
          title="Reject"
          loading={isLoadingReject}
          disabled={isLoadingReject}
          onPress={() => onReject(id)}
          style={{
            width: '50%',
            backgroundColor: colors.red.c500,
          }}
        />
        <Button
          title="Approve"
          loading={isLoadingApprove}
          disabled={isLoadingApprove}
          onPress={() => onApprove(id)}
          style={{
            width: '50%',
            backgroundColor: colors.blue.c500,
          }}
        />
      </View>
    </View>
  );
};
export default ListLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  button: {
    alignSelf: 'flex-start',
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: colors.primary.c500,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  filterIcon: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.neutral.c500,
    borderRadius: 10,
  },
  containerFlatlist: {
    gap: 12,
  },
});
