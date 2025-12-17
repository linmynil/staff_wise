import { TabRoutes } from '@navigation/routes';
import { FeatureConfig } from '@utils/types/feature';
import { Role } from '@utils/types/role.type';

export const TAB_FEATURES: Record<TabRoutes, FeatureConfig> = {
  [TabRoutes.HOME]: {
    permission: null,
    enabled: true,
  },

  [TabRoutes.APPLY_LEAVE]: {
    permission: 'leave.create',
    enabled: true,
    excludeRoles: [Role.ADMIN],
  },

  [TabRoutes.CHAT]: {
    permission: 'chat.read',
    enabled: true,
    excludeRoles: [Role.ADMIN],
  },

  [TabRoutes.OTHER]: {
    permission: null,
    enabled: true,
  },
};
