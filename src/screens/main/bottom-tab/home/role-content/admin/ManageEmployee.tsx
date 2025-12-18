import { AddIcon, FilterIcon, SearchIcon } from '@assets';
import { Button, Text, TextInput, View } from '@components';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import SelectBox, { SelectOption } from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import EmployeeItem from '@components/ui/employee-item';
import { EmployeeRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import {
  useGetEmployeesNoPaginationQuery,
  useGetEmployeesWithPaginationQuery,
} from '@services/employee';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { height } from '@utils/helpers/dimension';
import {
  Employee,
  GetEmployeeWithPaginationRequest,
} from '@utils/types/employee.type';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

interface FilterBottomSheetValue {
  department: string;
  managerId?: number;
}

const ManageEmployee = () => {
  const navigation = useNavigation<any>();

  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();

  const [query, setQuery] = useState({
    page: 1,
    limit: LIMIT,
    search: '',
    department: '',
    managerId: undefined as unknown as number,
  });

  const {
    data: dataGetEmployeesWithPagination,
    isFetching: isFetchingEmployeesWithPagination,
  } = useGetEmployeesWithPaginationQuery(
    {
      ...query,
      ...(query.managerId != null && {
        managerId:
          query.managerId?.toString() !== '-1'
            ? Number(query.managerId)
            : undefined,
      }),
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: dataGetEmployeesNoPagination } =
    useGetEmployeesNoPaginationQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const employeesOptions = dataGetEmployeesNoPagination?.map(employee => ({
    value: employee?.id?.toString(),
    label: `${employee?.fullName} - ${employee?.id}`,
  }));

  employeesOptions?.unshift({
    value: '-1',
    label: 'Select a manager',
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!dataGetEmployeesWithPagination?.data) return;

    if (query.page === 1) {
      setEmployees(dataGetEmployeesWithPagination?.data);
    } else {
      setEmployees(prev => [...prev, ...dataGetEmployeesWithPagination?.data]);
    }
    setHasMore(dataGetEmployeesWithPagination?.data?.length === LIMIT);
  }, [dataGetEmployeesWithPagination]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(prev => ({
      ...prev,
      page: 1,
      search: value,
    }));
  }, 400);

  const loadMore = () => {
    if (isFetchingEmployeesWithPagination || !hasMore) return;
    setQuery(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const onAdditionalLeave = () => {
    navigation.navigate(EmployeeRoutes.EMPLOYEE_ADDITIONAL_LEAVE);
  };

  const handleApplyFilter = (filter: FilterBottomSheetValue) => {
    setQuery(prev => ({
      ...prev,
      page: 1,
      department: filter?.department || '',
      ...(filter?.managerId != null && {
        managerId: filter?.managerId,
      }),
    }));

    closeBottomSheet2();
  };

  const showBottomFilter = () => {
    Keyboard.dismiss();
    openBottomSheet2({
      snapPoints: [height * 0.6, height * 0.75],
      fixSnapPoints: true,
      content: (
        <EmployeeFilterContent
          defaultValueFilter={query}
          employeesOptions={employeesOptions}
          onDone={handleApplyFilter}
        />
      ),
    });
  };

  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Employee Management"
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
          onPress={onAdditionalLeave}
        />
      }
    >
      <View style={styles.container}>
        <View row space_between center gap={10}>
          <View flex={1}>
            <TextInput
              inputContainerStyle={{
                borderColor: colors.neutral.c500,
              }}
              placeholder="Search Employee"
              leftIcon={<SearchIcon />}
              onChange={debouncedSearch}
            />
          </View>
          <Button.IconButton
            icon={<FilterIcon />}
            style={styles.filterIcon}
            onPress={showBottomFilter}
          />
        </View>
        <FlatList
          keyExtractor={item => item?.id?.toString()}
          data={employees}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <EmployeeItem
              item={item}
              onPress={() => console.log('id', item?.id)}
            />
          )}
        />
      </View>
    </MainLayout>
  );
};

interface EmployeeFilterContentProps {
  defaultValueFilter: GetEmployeeWithPaginationRequest;
  employeesOptions?: SelectOption[];
  onDone: (filter: FilterBottomSheetValue) => void;
}

const EmployeeFilterContent: React.FC<EmployeeFilterContentProps> = ({
  defaultValueFilter,
  employeesOptions,
  onDone,
}) => {
  const { department, managerId } = defaultValueFilter;
  const [filterBottom, setFilterBottom] = useState({
    department: department || '',
    managerId: managerId || (undefined as unknown as number),
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
    >
      <View gap={12}>
        <Text weight={600} size={20} style={{ textAlign: 'center' }}>
          Employee Filter
        </Text>

        <TextInput
          label="Department"
          placeholder="Enter search department"
          defaultValue={filterBottom.department}
          onChange={value =>
            setFilterBottom(prev => ({
              ...prev,
              department: value,
            }))
          }
        />

        <SelectBox
          label="Manager"
          placeholder="Select a manager"
          searchPlaceholder="Enter manager name"
          searchLabel="Manager name"
          options={employeesOptions}
          value={filterBottom.managerId?.toString() ?? ''}
          onChange={id => setFilterBottom(prev => ({ ...prev, managerId: id }))}
        />
      </View>

      <Button title="Apply" onPress={() => onDone(filterBottom)} />
    </View>
  );
};

export default ManageEmployee;

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
});
