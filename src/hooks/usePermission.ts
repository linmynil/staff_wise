import { useAppSelector } from '@redux/store';
import { hasPermission } from '@utils/helpers/permisson.helper';

export const usePermission = () => {
  const permissions = useAppSelector(state => state.auth.permissions);

  return {
    can: (permission: string | string[]) => hasPermission(permissions, permission),
  };
};
