import { AddIcon, SearchIcon } from '@assets';
import { Button, TextInput, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import AccountItem from '@components/ui/account-item';
import { EmployeeRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useGetAccountsQuery } from '@services/account';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { Account } from '@utils/types/account.type';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const ManageAccount = () => {
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState({
    page: 1,
    limit: LIMIT,
    search: '',
  });

  const { data: dataGetAccounts, isFetching: isFetchingAccounts } = useGetAccountsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!dataGetAccounts?.data) return;

    if (query.page === 1) {
      setAccounts(dataGetAccounts?.data);
    } else {
      setAccounts(prev => [...prev, ...dataGetAccounts?.data]);
    }
    setHasMore(dataGetAccounts?.data?.length === LIMIT);
  }, [dataGetAccounts]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery({
      page: 1,
      limit: LIMIT,
      search: value,
    });
  }, 400);

  const loadMore = () => {
    if (isFetchingAccounts || !hasMore) return;
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
      title="Account Management"
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
          placeholder="Search Account"
          leftIcon={<SearchIcon />}
          onChange={debouncedSearch}
        />
        <FlatList
          keyExtractor={item => item?.id?.toString()}
          data={accounts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <AccountItem item={item} onPress={() => console.log('id', item?.id)} />
          )}
        />
      </View>
    </MainLayout>
  );
};

export default ManageAccount;

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
