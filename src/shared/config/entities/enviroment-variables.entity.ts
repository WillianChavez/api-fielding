import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

import { Enviroments, Enviroment } from '../enviroment/enviroments';
import { Dialect } from '../enviroment/dialect';
import { IsValidDialect } from '../validators/dialect.validator';

export class EnviromentVariables {
  @IsNotEmpty()
  @IsEnum(Enviroments)
  APP_ENV: Enviroment;

  @IsNotEmpty()
  @IsString()
  HOST: string;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  SECRET_KEY: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  @IsValidDialect()
  DB_DIALECT: Dialect;

  @IsNotEmpty()
  @IsBoolean()
  DB_LOGGER: boolean;

  @IsNotEmpty()
  @IsBoolean()
  DB_AUTOLOAD_MODELS: boolean;

  @IsNotEmpty()
  @IsString()
  APP_DEBUG: string;

  @IsString()
  @ValidateIf((_, value) => (value ?? '').trim().length > 0)
  MAIL_HOST!: string;

  @IsNumber()
  @ValidateIf((_, value) => (value ?? '').toString().trim().length > 0)
  MAIL_PORT!: number;

  @IsString()
  @ValidateIf((_, value) => (value ?? '').trim().length > 0)
  MAIL_USER!: string;

  @IsString()
  @ValidateIf((_, value) => (value ?? '').trim().length > 0)
  MAIL_PASS!: string;

  @IsString()
  @ValidateIf((_, value) => (value ?? '').trim().length > 0)
  MAIL_FROM!: string;
}
