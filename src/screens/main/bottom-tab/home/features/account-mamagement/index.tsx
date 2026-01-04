import { AddIcon, FilterIcon, SearchIcon } from '@assets';
import { Button, EmptyData, Text, TextInput, View } from '@components';
import { useBottomSheetContext2 } from '@components/common/bottom-sheet-outside';
import SelectBox, { SelectOption } from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import AccountItem from '@components/ui/account-item';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useGetAccountsQuery } from '@services/account';
import colors from '@utils/constants/colors';
import { LIMIT } from '@utils/constants/constants';
import { statusOptionsFilter } from '@utils/constants/form';
import { height } from '@utils/helpers/dimension';
import { Account, GetAccountRequest } from '@utils/types/account.type';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, RefreshControl, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

interface FilterBottomSheetValue {
  isActive?: boolean | string;
}

const initialQuery: GetAccountRequest = {
  page: 1,
  limit: LIMIT,
  search: '',
  isActive: '_',
};
const ManageAccount = () => {
  const navigation = useNavigation<any>();
  const { openBottomSheet2, closeBottomSheet2 } = useBottomSheetContext2();
  const [query, setQuery] = useState(initialQuery);
  const [searchText, setSearchText] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const onEndReachedCalledDuringMomentum = React.useRef(true);

  const { data: dataGetAccounts, isFetching: isFetchingAccounts } = useGetAccountsQuery(
    {
      ...query,
      isActive: query.isActive === '_' ? undefined : query.isActive,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

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
    setSearchText('');
    setQuery(initialQuery);
    setTimeout(() => {
      setHasMore(true);
    }, 0);
  };

  const navigateCreateAccountWithEmployee = () => {
    navigation.getParent().navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_CREATE_ACOUNT_WITH_EMPLOYEE,
    });
  };

  const navigateAccountInfo = (id: number) => {
    navigation.navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_ACCOUNT_INFO,
      params: {
        id: id,
      },
    });
  };

  const handleApplyFilter = (filter: FilterBottomSheetValue) => {
    const isActive = filter?.isActive === '_' ? '_' : filter?.isActive === 'true' ? true : false;
    setQuery(prev => ({
      ...prev,
      page: 1,
      isActive: isActive,
    }));

    closeBottomSheet2();
  };

  const showBottomFilter = () => {
    Keyboard.dismiss();
    openBottomSheet2({
      snapPoints: [height * 0.6, height * 0.75],
      fixSnapPoints: true,
      content: (
        <AccountFilterContent
          defaultValueFilter={query}
          statusOptions={statusOptionsFilter}
          onDone={handleApplyFilter}
        />
      ),
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
        <View row space_between center gap={10}>
          <View flex={1}>
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
          </View>
          <Button.IconButton
            icon={<FilterIcon />}
            style={styles.filterIcon}
            onPress={showBottomFilter}
          />
        </View>
        <FlatList
          refreshControl={<RefreshControl refreshing={isFetchingAccounts} onRefresh={onRefresh} />}
          keyExtractor={item => item?.id?.toString()}
          data={accounts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
          }}
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
            <AccountItem item={item} onPress={() => navigateAccountInfo(item?.id)} />
          )}
          ListEmptyComponent={isFetchingAccounts ? <></> : <EmptyData title="Account is empty" />}
        />
      </View>
    </MainLayout>
  );
};

interface AccountFilterContentProps {
  defaultValueFilter: GetAccountRequest;
  statusOptions?: SelectOption[];
  onDone: (filter: FilterBottomSheetValue) => void;
}

const AccountFilterContent: React.FC<AccountFilterContentProps> = ({
  defaultValueFilter,
  statusOptions,
  onDone,
}) => {
  const { isActive } = defaultValueFilter;
  const [filterBottom, setFilterBottom] = useState({
    isActive: isActive,
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
          Account Filter
        </Text>
        <SelectBox
          label="Status"
          placeholder="Select a status"
          options={statusOptions}
          value={filterBottom.isActive?.toString() ?? ''}
          onChange={id => setFilterBottom(prev => ({ ...prev, isActive: id }))}
        />
      </View>

      <Button title="Apply" onPress={() => onDone(filterBottom)} />
    </View>
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
  filterIcon: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.neutral.c500,
    borderRadius: 10,
  },
});
