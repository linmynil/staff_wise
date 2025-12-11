import { useAppSelector } from '@redux/selectors';
import { Account, useGetAccountInfoQuery } from '@services/account';

const useGetAccountInfo = () => {
  const accountInfo = useAppSelector(state => state.account.accountInfo);
  const id = accountInfo?.id;
  const { data: account } = useGetAccountInfoQuery(id, {
    skip: !id,
  });

  return account as Account;
};
export default useGetAccountInfo;
