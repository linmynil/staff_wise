import { useAppSelector } from '@redux/store';
import { useGetEmployeeInfoQuery } from '@services/employee';
import { Role } from '@utils/types/role.type';

const useGetEmployeeInfo = () => {
  const { roles } = useAppSelector(state => state.auth);
  const isAdmin = roles?.includes(Role.ADMIN);
  const { data: employee } = useGetEmployeeInfoQuery({}, { skip: isAdmin || roles?.length === 0 });

  return employee;
};
export default useGetEmployeeInfo;
