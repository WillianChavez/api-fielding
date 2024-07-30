import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import base from '../enviroment/base';

@Injectable()
export class EnvConfigService {
  constructor(@Inject(base.KEY) public vars: ConfigType<typeof base>) {}

  get pathDB(): string {
    return `${this.vars.db.dialect}://${this.vars.db.username}:${this.vars.db.password}@${this.vars.db.host}`;
  }

  get path(): string {
    return `${this.vars.host}:${this.vars.port}`;
  }

  get secretKey(): string {
    return this.vars.secretKey;
  }
}
