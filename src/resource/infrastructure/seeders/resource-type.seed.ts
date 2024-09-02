import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';
import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'ResourceTypeModel',
  enableAutoId: false,
})
export class SeedResourceType implements OnSeederInit {
  run() {
    const resourceTypes: { name: ResourceTypeName }[] = [
      {
        name: 'request',
      },
      {
        name: 'folder',
      },
      {
        name: 'project',
      },
    ];

    return resourceTypes;
  }
}
