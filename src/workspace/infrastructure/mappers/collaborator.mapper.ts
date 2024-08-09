import { Collaborator } from 'src/workspace/domain/entities/collaborator.entity';
import { BaseMapper } from 'src/workspace/domain/mappers/base.mapper';
import CollaboratorModel from '../models/collaborator.model';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class CollaboratorMapper extends BaseMapper<
  Collaborator,
  CollaboratorModel
> {
  toDomain(model: CollaboratorModel): Collaborator {
    return new Collaborator({
      id: model.id,
      role: model.role_id,
      user: model.user_id,
    });
  }
  toPersistence(domain: Collaborator): CollaboratorModel {
    const collaborator = domain.toValue();
    return {
      id: collaborator.id,
      role_id: collaborator.role,
      user_id: collaborator.user,
    } as CollaboratorModel;
  }
}
