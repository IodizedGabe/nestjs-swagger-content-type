import * as request from 'supertest';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';


export function createTestingModule(): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [AppModule],
  });
}

/* Create app from testing module.
 */
export async function createAppFrom(testingModule: TestingModuleBuilder): Promise<INestApplication> {
  const moduleRef = await testingModule.compile();
  const app = moduleRef.createNestApplication();
  AppModule.setupApp(app);
  await app.init();
  return app;
}

/* Create a testing-version of the app.
 */
export async function createApp(): Promise<INestApplication> {
  return createAppFrom(createTestingModule());
}


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  it('/api-json', async () => {
    const response = await request(app.getHttpServer())
        .get('/api-json');

    expect(response.status).toEqual(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });
});
