import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                productId: '123456',
                price: 10,
              },
              {
                productId: '123457',
                price: 11,
              },
              {
                productId: '123458',
                price: 12,
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get(ProductsController);
    service = module.get(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should get an array of products', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          productId: 123456,
          price: 10,
        },
        {
          productId: 123457,
          price: 11,
        },
        {
          productId: 123458,
          price: 12,
        },
      ]);
    });
  });
});
