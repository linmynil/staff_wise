import { useAppSelector } from '@redux/store';
import { useGetAccountInfoQuery } from '@services/account';
import { Account } from '@utils/types/account.type';

const useGetAccountInfo = () => {
  const accountInfo = useAppSelector(state => state.account.accountInfo);
  const id = accountInfo?.id!;

  const { data: account } = useGetAccountInfoQuery(id, {
    skip: !id,
  });

  return account as Account;
};
export default useGetAccountInfo;
