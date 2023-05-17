import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindAllProduct, Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<FindAllProduct[]> {
    const products = await this.productsService.findAll();
    return products.map(({ productId, price }) => ({ productId, price }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
