import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Products - /products (e2e)', () => {
  const products = [
    {
      productId: 123456,
      price: 10,
    },
    {
      productId: 123457,
      price: 11,
    },
    {
      productId: 1234568,
      price: 12,
    },
  ];

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get all products [GET /products]', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(products);
  });
});
