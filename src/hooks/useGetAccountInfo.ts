import { useAppSelector } from '@redux/store';
import { useGetAccountInfoQuery } from '@services/account';
import { Role } from '@utils/types/role.type';

const useGetAccountInfo = () => {
  const { accountInfo } = useAppSelector(state => state.account);
  const { roles } = useAppSelector(state => state.auth);
  const idAccount = accountInfo?.id!;
  const isAdmin = roles?.includes(Role.ADMIN);
  const { data: account } = useGetAccountInfoQuery(idAccount, {
    skip: !idAccount || !isAdmin,
  });

  return account;
};
export default useGetAccountInfo;
