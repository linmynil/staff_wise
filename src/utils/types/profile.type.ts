export enum Role {
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export interface ProfileResponse {
  id: number;
  avatar?: string;
  name?: string;
  position?: Role;
}
