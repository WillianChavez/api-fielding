import { registerAs } from '@nestjs/config';
import { Dialect } from './dialect';

export default registerAs('', () => ({
  host: process.env.HOST,
  port: process.env.PORT || 3000,
  url: 'http://' + process.env.HOST + ':' + process.env.PORT,
  appEnv: process.env.APP_ENV,
  secretKey: process.env.SECRET_KEY,
  db: {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGER !== 'false' ? console.log : false,
  },
  autoloadModels: process.env.DB_AUTOLOAD_MODELS === 'true',

  appDebug: process.env.DB_DIALECT,
}));
