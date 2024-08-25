import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'AuthorizationTypeModel',
  enableAutoId: false,
})
export class SeedAuthorizationType implements OnSeederInit {
  run() {
    const authorizationTypes = [
      {
        name: 'No Auth',
      },
      {
        name: 'Inherit Auth from Parent',
      },
      {
        name: 'Bearer Token',
      },
    ];

    return authorizationTypes;
  }
}
