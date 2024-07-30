export const pathEnv = {
  dev: '.env',
  prod: '.prod.env',
  test: '.test.env',
};

export enum Enviroments {
  dev = 'development',
  prod = 'production',
  test = 'test',
}

export type Enviroment = 'development' | 'production' | 'test';
