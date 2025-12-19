import { useAppSelector } from '@redux/store';
import { Role } from '@utils/types/role.type';
import React from 'react';

interface PermissionGuardProps {
  permission?: string | null;
  visibleRoles?: Role[];
  excludeRoles?: Role[];
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  visibleRoles,
  excludeRoles,
  children,
}) => {
  const roles = useAppSelector(state => state.auth.roles ?? []);
  const permissions = useAppSelector(state => state.auth.permissions ?? []);

  const normalizedRoles = roles.map(r => r.toUpperCase());

  if (visibleRoles && !visibleRoles.some(r => normalizedRoles.includes(r.toUpperCase())))
    return null;
  if (excludeRoles && excludeRoles.some(r => normalizedRoles.includes(r.toUpperCase())))
    return null;
  if (permission && !permissions.includes(permission)) return null;

  return <>{children}</>;
};

export default PermissionGuard;
