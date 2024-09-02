import UserModel from '@/user/infrastructure/models/user.model';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
import RoleModel from '@/workspace/infrastructure/models/role.model';
import { Role } from '../../interface/role.enum';
import { META_ROLES } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private reflector: Reflector,
    private JwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(META_ROLES, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [type, token] = (request?.headers['authorization'] ?? '').split(' ');
    if (!token || type.toLowerCase() !== 'bearer') {
      throw new BadRequestException('Token or type is missing');
    }
    let payload;

    try {
      payload = this.JwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('Token invalid');
    }

    if (!payload.id || !payload.collaboratorId) {
      throw new BadRequestException('Token invalid');
    }

    const user = await this.userModel.findOne({
      where: {
        id: payload.id,
      },
      include: [
        {
          model: CollaboratorModel,
          where: {
            id: payload.collaboratorId,
          },
          include: [
            {
              model: RoleModel,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const role = user.collaborator.role?.name;
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    if (!roles.includes(role as Role)) {
      throw new BadRequestException('Role not allowed');
    }

    return true;
  }
}
