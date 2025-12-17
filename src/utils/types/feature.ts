import { Role } from './role.type';

export type FeatureConfig = {
  enabled: boolean;
  permission?: string | null;
  excludeRoles?: readonly Role[];
  visibleRoles?: Role[];
};
