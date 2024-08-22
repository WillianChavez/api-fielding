import { WorkspaceModule } from '../.././src/workspace/workspace.module';
import { AuthModule } from '../../src/user/user.module';
import { SharedModule } from '../../src/shared/shared.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SharedModule, AuthModule, WorkspaceModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user /POST', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
