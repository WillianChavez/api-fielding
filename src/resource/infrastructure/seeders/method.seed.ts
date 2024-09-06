import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import MethodModel from '../models/method.model';

@Seeder({
  model: MethodModel,
  enableAutoId: false,
})
export class SeedMethod implements OnSeederInit {
  run() {
    const methods = [
      {
        name: 'GET',
      },
      {
        name: 'POST',
      },
      {
        name: 'PUT',
      },
      {
        name: 'DELETE',
      },
      {
        name: 'PATCH',
      },
      {
        name: 'HEAD',
      },
      {
        name: 'OPTIONS',
      },
    ];

    return methods;
  }
}
