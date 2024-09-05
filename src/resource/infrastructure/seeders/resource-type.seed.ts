import { ResourceTypeName } from '@/resource/domain/entities/resource-type.entity';
import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import ResourceTypeModel from '../models/resource-type.model';

@Seeder({
  model: ResourceTypeModel,
  enableAutoId: false,
  unique: ['name'],
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
      {
        name: 'environment',
      },
    ];

    return resourceTypes;
  }
}
