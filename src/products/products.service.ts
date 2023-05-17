import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(productId: number): Promise<Product> {
    return this.productModel.findOne({ productId }).exec();
  }
}
