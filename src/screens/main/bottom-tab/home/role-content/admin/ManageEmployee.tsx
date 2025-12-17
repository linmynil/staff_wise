import { AddIcon, SearchIcon } from '@assets';
import { Button, TextInput, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import EmployeeItem from '@components/ui/employee-item';
import { EmployeeRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useGetEmployeesQuery } from '@services/employee';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { Employee } from '@utils/types/employee.type';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const ManageEmployee = () => {
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState({
    page: 1,
    limit: LIMIT,
    search: '',
  });

  const { data: dataGetEmployees, isFetching: isFetchingEmployees } =
    useGetEmployeesQuery(query, {
      refetchOnMountOrArgChange: true,
    });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!dataGetEmployees?.data) return;

    if (query.page === 1) {
      setEmployees(dataGetEmployees?.data);
    } else {
      setEmployees(prev => [...prev, ...dataGetEmployees?.data]);
    }
    setHasMore(dataGetEmployees?.data?.length === LIMIT);
  }, [dataGetEmployees]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery({
      page: 1,
      limit: LIMIT,
      search: value,
    });
  }, 400);

  const loadMore = () => {
    if (isFetchingEmployees || !hasMore) return;
    setQuery(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const onAdditionalLeave = () => {
    navigation.navigate(EmployeeRoutes.EMPLOYEE_ADDITIONAL_LEAVE);
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
        <TextInput
          inputContainerStyle={{
            borderColor: colors.neutral.c500,
          }}
          placeholder="Search Employee"
          leftIcon={<SearchIcon />}
          onChange={debouncedSearch}
        />
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
});
