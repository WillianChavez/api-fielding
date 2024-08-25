import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'ResourceTypeModel',
  enableAutoId: false,
})
export class SeedResourceType implements OnSeederInit {
  run() {
    const resourceTypes = [
      {
        name: 'Http request',
      },
    ];

    return resourceTypes;
  }
}
