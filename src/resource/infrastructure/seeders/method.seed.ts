import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'MethodModel',
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
