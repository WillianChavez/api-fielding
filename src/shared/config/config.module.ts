import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validators/env.validator';
import { pathEnv } from './enviroment/enviroments';
import { ConfigService } from './services/config.service';
import { EnvConfigService } from './services/env-config.service';
import base from './enviroment/base';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [base],
      isGlobal: true,
      validate,
      envFilePath: pathEnv[process.env.APP_ENV] || pathEnv.dev,
    }),
  ],
  providers: [ConfigService, EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvModule {}
