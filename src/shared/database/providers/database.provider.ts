import { Injectable } from '@nestjs/common';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { EnvConfigService } from 'src/shared/config/services/env-config.service';

@Injectable()
export class SequelizeOptions implements SequelizeOptionsFactory {
  constructor(private readonly envConfigService: EnvConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      ...this.envConfigService.vars.db,
      autoLoadModels: this.envConfigService.vars.autoloadModels,
      synchronize: true,
      models: [__dirname + '@/**/*.model.{ts,js}'],
    };
  }
}
