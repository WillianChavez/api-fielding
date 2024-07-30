export const Dialects = [
  'mysql',
  'mariadb',
  'postgres',
  'mssql',
  'sqlite',
] as const;

export type Dialect = (typeof Dialects)[number];
