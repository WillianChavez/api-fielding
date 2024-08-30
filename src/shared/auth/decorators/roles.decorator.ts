import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/valid-roles';

export const META_ROLES = 'roles';

export const Roles = (roles: Role[]) => {
  return SetMetadata(META_ROLES, roles);
};
