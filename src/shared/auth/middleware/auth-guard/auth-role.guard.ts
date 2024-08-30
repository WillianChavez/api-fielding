// import UserModel from '@/user/infrastructure/models/user.model';
// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { InjectModel } from '@nestjs/sequelize';
// import { JwtService } from '@nestjs/jwt';
// import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
// import RoleModel from '@/workspace/infrastructure/models/role.model';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     @InjectModel(UserModel)
//     private userModel: typeof UserModel,
//     private reflector: Reflector,
//     private JwtService: JwtService,
//   ) {}

//   // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//   //     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//   // }

//   async use(req: Request & { user?: string }, res: Response, next: () => void) {
//     const [type, token] = (req?.headers['authorization'] ?? '').split(' ');
//     if (!token || type.toLowerCase() !== 'bearer') {
//       throw new BadRequestException('Token or type is missing');
//     }
//     const payload = this.JwtService.decode(token);

//     const user = await this.userModel.findOne({
//       where: {
//         id: payload.id,
//       },
//       include: [
//         {
//           model: CollaboratorModel,
//           where: {
//             id: payload.collaboratorId,
//           },
//           include: [
//             {
//               model: RoleModel,
//               attributes: ['name'],
//             },
//           ],
//         },
//       ],
//     });

//     if (!user) {
//       throw new BadRequestException('User not found');
//     }

//     const role = user.collaborator.role?.name;
//     if (!role) {
//       throw new BadRequestException('Role not found');
//     }

//     // const allowedRoles = this.reflector.get<string[]>('roles', req.method);
//     // if (!allowedRoles.includes(role)) {
//     //   throw new BadRequestException('Role not allowed');
//     // }

//     // req.token = token;
//     // req.user = user;

//     return next();
//   }
// }
