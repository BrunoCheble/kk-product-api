import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';

const mockProduct = {
  productId: 123456,
  price: 10,
};

const productsArray = [
  {
    productId: 123456,
    price: 10,
  },
  {
    productId: 123457,
    price: 11,
  },
];

describe('ProductService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'PRODUCT_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(mockProduct),
            constructor: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(ProductsService);
    model = module.get<Model<Product>>('PRODUCT_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(productsArray),
    } as any);
    const products = await service.findAll();
    expect(products).toEqual(productsArray);
  });
});
