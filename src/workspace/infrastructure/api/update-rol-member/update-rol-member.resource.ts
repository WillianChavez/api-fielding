import { PrimitiveMember } from '@/workspace/domain/entities/member.entity';
import { PrimitiveRole } from '@/workspace/domain/entities/role.entity';
import { Injectable } from 'src/shared/dependencies';

export interface UpdateRolMemberResourceJson {
  id: string;
  name: string;
  email: string;
  role: PrimitiveRole;
}

@Injectable()
export class UpdateRolMemberResource {
  toJson(member: PrimitiveMember): UpdateRolMemberResourceJson {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role.toValue(),
    };
  }
}
