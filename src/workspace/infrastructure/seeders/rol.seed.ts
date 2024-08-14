import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';

@Seeder({
  model: 'RoleModel',
  enableAutoId: false,
})
export class SeedRol implements OnSeederInit {
  run() {
    const roles = [
      {
        name: 'Admin',
      },
      {
        name: 'Dev',
      },
      {
        name: 'Espectador',
      },
    ];

    return roles;
  }
}
