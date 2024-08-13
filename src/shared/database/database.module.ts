import { Module } from '@nestjs/common';
import { EnvConfigService } from '../config/services/env-config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from './providers/database.provider';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
import { SeederModule } from 'nestjs-sequelize-seeder';
initSequelizeCLS();

@Module({
  imports: [
    SeederModule.forRoot({
      isGlobal: true,
      logging: true,
      connection: 'default',
      runOnlyIfTableIsEmpty: true,
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
      inject: [EnvConfigService],
    }),
    SequelizeTransactionalModule.register(),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
