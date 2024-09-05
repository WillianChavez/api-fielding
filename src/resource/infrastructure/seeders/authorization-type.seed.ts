import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import AuthorizationTypeModel from '../models/authorization-type.model';

@Seeder({
  model: AuthorizationTypeModel,
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
