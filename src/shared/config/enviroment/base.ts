import { registerAs } from '@nestjs/config';
import { Dialect } from './dialect';
import { MailerOptions } from '@nestjs-modules/mailer';

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
  mailer: {
    transport: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    defaults: {
      from: process.env.MAIL_FROM,
    },
  } as MailerOptions,
  autoloadModels: process.env.DB_AUTOLOAD_MODELS === 'true',

  appDebug: process.env.DB_DIALECT,
}));
