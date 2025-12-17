import { useAppSelector } from '@redux/store';
import { usePermission } from './usePermission';

import { TabRoutes } from '@navigation/routes';
import { TAB_FEATURES } from '@config/tabFeatures.config';

export const useTabFeatures = () => {
  const { can } = usePermission();
  const roles = useAppSelector(state => state.auth.roles ?? []);

  const getEnabledTabs = (): TabRoutes[] => {
    return (Object.keys(TAB_FEATURES) as TabRoutes[]).filter(tab => {
      const feature = TAB_FEATURES[tab];

      if (!feature.enabled) return false;

      if (feature.excludeRoles?.some(r => roles.includes(r))) {
        return false;
      }

      if (!feature.permission) return true;

      return can(feature.permission);
    });
  };

  return { getEnabledTabs };
};
