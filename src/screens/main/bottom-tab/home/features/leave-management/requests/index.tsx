import { FilterIcon, SearchIcon } from '@assets';
import { Button, EmptyData, Text, TextInput, View } from '@components';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import SelectBox, { SelectOption } from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import LeaveItem from '@components/ui/leave-item';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useGetEmployeesNoPaginationQuery } from '@services/employee';
import { useGetLeavesQuery } from '@services/leave';

import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { height } from '@utils/helpers/dimension';
import { GetLeaveRequest, Leave } from '@utils/types/leave.type';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, RefreshControl, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

interface FilterBottomSheetValue {
  department: string;
  managerId?: number;
}

const initialQuery: GetLeaveRequest = {
  page: 1,
  limit: LIMIT,
  status: 'PENDING',
  leaveType: 'ANNUAL',
  employeeId: undefined as unknown as number,
  fromDate: undefined,
  toDate: undefined,
};

const LeaveStatus = () => {
  const navigation = useNavigation<any>();
  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();
  const [query, setQuery] = useState(initialQuery);
  const [searchText, setSearchText] = useState('');
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

  useEffect(() => {
    if (!dataGetLeaves?.data) return;

    if (query.page === 1) {
      setLeaves(dataGetLeaves?.data);
    } else {
      setLeaves(prev => [...prev, ...dataGetLeaves?.data]);
    }
    setHasMore(dataGetLeaves?.data?.length === LIMIT);
  }, [dataGetLeaves]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setHasMore(true);
    setQuery(prev => ({
      ...prev,
      page: 1,
      limit: LIMIT,
      search: value,
    }));
  }, 400);

  const loadMore = () => {
    if (isFetchingLeaves || !hasMore) return;
    setQuery(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const onRefresh = () => {
    setSearchText('');
    setQuery(initialQuery);
    setTimeout(() => {
      setHasMore(true);
    }, 0);
  };

  // const handleApplyFilter = (filter: FilterBottomSheetValue) => {
  //   setQuery(prev => ({
  //     ...prev,
  //     page: 1,
  //     department: filter?.department || '',
  //     ...(filter?.managerId != null && {
  //       managerId: filter?.managerId,
  //     }),
  //   }));

  //   closeBottomSheet2();
  // };

  // const showBottomFilter = () => {
  //   Keyboard.dismiss();
  //   openBottomSheet2({
  //     snapPoints: [height * 0.6, height * 0.75],
  //     fixSnapPoints: true,
  //     content: (
  //       <EmployeeFilterContent
  //         defaultValueFilter={query}
  //         employeesOptions={employeesOptions}
  //         onDone={handleApplyFilter}
  //       />
  //     ),
  //   });
  // };

  const navigateLeaveInfo = (id: number) => {
    navigation.getParent().navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_EMPLOYEE_INFO,
      params: {
        id: id,
      },
    });
  };

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Leave status">
      <View style={styles.container}>
        <View row space_between center gap={10}>
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
          {/* <Button.IconButton
            icon={<FilterIcon />}
            style={styles.filterIcon}
            onPress={showBottomFilter}
          /> */}
        </View>
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
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <LeaveItem item={item} isEmployee={true} onPress={() => navigateLeaveInfo(item?.id)} />
          )}
          ListEmptyComponent={isFetchingLeaves ? <></> : <EmptyData title="Leave is empty" />}
        />
      </View>
    </MainLayout>
  );
};

// interface EmployeeFilterContentProps {
//   defaultValueFilter: GetEmployeeWithPaginationRequest;
//   employeesOptions?: SelectOption[];
//   onDone: (filter: FilterBottomSheetValue) => void;
// }

// const EmployeeFilterContent: React.FC<EmployeeFilterContentProps> = ({
//   defaultValueFilter,
//   employeesOptions,
//   onDone,
// }) => {
//   const { department, managerId } = defaultValueFilter;
//   const [filterBottom, setFilterBottom] = useState({
//     department: department || '',
//     managerId: managerId || (undefined as unknown as number),
//   });
//   return (
//     <View
//       flex={1}
//       paddingHorizontal={16}
//       gap={16}
//       paddingTop={8}
//       style={{
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}
//       onStartShouldSetResponder={() => {
//         Keyboard.dismiss();
//         return false;
//       }}
//     >
//       <View gap={12}>
//         <Text weight={600} size={20} style={{ textAlign: 'center' }}>
//           Employee Filter
//         </Text>

//         <TextInput
//           label="Department"
//           placeholder="Enter search department"
//           defaultValue={filterBottom.department}
//           onChange={value => setFilterBottom(prev => ({ ...prev, department: value }))}
//         />

//         <SelectBox
//           label="Manager"
//           placeholder="Select a manager"
//           searchPlaceholder="Enter manager name"
//           searchLabel="Manager name"
//           options={employeesOptions}
//           value={filterBottom.managerId?.toString() ?? ''}
//           onChange={id => setFilterBottom(prev => ({ ...prev, managerId: id }))}
//         />
//       </View>

//       <Button title="Apply" onPress={() => onDone(filterBottom)} />
//     </View>
//   );
// };

export default LeaveStatus;

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
