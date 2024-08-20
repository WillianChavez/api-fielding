import { BaseMapper } from '@/workspace/domain/mappers/base.mapper';
import CollaboratorModel from '../models/collaborator.model';
import { Member } from '@/workspace/domain/entities/member.entity';
import { Role } from '@/workspace/domain/entities/role.entity';
import { Injectable } from '@/shared/dependencies';

@Injectable()
export class MemberMapper extends BaseMapper<Member, CollaboratorModel> {
  toDomain(model: CollaboratorModel): Member {
    return new Member({
      id: model.user.id,
      email: model.user.email,
      name: model.user.name,
      role: new Role({
        id: model.role.id,
        name: model.role.name,
      }),
    });
  }
  toPersistence(domain: Member): CollaboratorModel {
    const member = domain.toValue();
    const role = member.role.toValue();

    return {
      user: {
        id: member.id,
        email: member.email,
        name: member.name,
      },
      role_id: role.id,
    } as CollaboratorModel;
  }
}
