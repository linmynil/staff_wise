import { AddIcon, SearchIcon } from '@assets';
import { Button, EmptyData, TextInput, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import AccountItem from '@components/ui/account-item';
import { AdminRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useGetAccountsQuery } from '@services/account';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { Account, GetAccountWithPaginationRequest } from '@utils/types/account.type';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const initialQuery: GetAccountWithPaginationRequest = {
  page: 1,
  limit: LIMIT,
  search: '',
};
const ManageAccount = () => {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState(initialQuery);
  const [searchText, setSearchText] = useState('');

  const { data: dataGetAccounts, isFetching: isFetchingAccounts } = useGetAccountsQuery(
    {
      ...query,
      // ...(query.managerId != null && {
      //   managerId: query.managerId?.toString() !== '-1' ? Number(query.managerId) : undefined,
      // }),
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

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
    setAccounts([]);
    setHasMore(true);
    setQuery(prev => ({
      ...prev,
      page: 1,
      limit: LIMIT,
      search: value,
    }));
  }, 400);

  const loadMore = () => {
    if (isFetchingAccounts || !hasMore) return;
    setQuery(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const onRefresh = () => {
    setHasMore(true);
    setAccounts([]);
    setSearchText('');
    setQuery(initialQuery);
  };
  const navigateCreateAccountWithEmployee = () => {
    navigation.navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_CREATE_ACOUNT_WITH_EMPLOYEE,
    });
  };

  const navigateAccountInfo = (id: number) => {
    navigation.getParent().navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_ACCOUNT_INFO,
      params: {
        id: id,
      },
    });
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Account Management"
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
          onPress={navigateCreateAccountWithEmployee}
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
          value={searchText}
          onChange={value => {
            setSearchText(value);
            debouncedSearch(value);
          }}
        />
        <FlatList
          refreshControl={<RefreshControl refreshing={isFetchingAccounts} onRefresh={onRefresh} />}
          keyExtractor={item => item?.id?.toString()}
          data={accounts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <AccountItem item={item} onPress={() => navigateAccountInfo(item?.id)} />
          )}
          ListEmptyComponent={isFetchingAccounts ? <></> : <EmptyData title="Account is empty" />}
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
