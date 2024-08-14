import { User } from 'src/workspace/domain/entities/user.entity';
import CollaboratorModel from '../models/collaborator.model';
import { Role } from 'src/workspace/domain/entities/role.entity';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class UserMapper {
  toDomain(collaboratorModel: CollaboratorModel): User {
    return new User({
      id: collaboratorModel.id,
      name: collaboratorModel.user.name,
      email: collaboratorModel.user.email,
      role: new Role({
        id: collaboratorModel.role.id,
        name: collaboratorModel.role.name,
      }),
    });
  }
}
