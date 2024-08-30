import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interface/valid-roles';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
