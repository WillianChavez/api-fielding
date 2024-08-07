import { Module } from '@nestjs/common';
import { EnvConfigService } from '../config/services/env-config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeOptions } from './providers/database.provider';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
initSequelizeCLS();

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
      inject: [EnvConfigService],
    }),
    SequelizeTransactionalModule.register(),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
