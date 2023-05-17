import { Document } from 'mongoose';

export interface Product extends Document {
  readonly productId: number;
  readonly price: number;
}

export interface FindAllProduct {
  readonly productId: number;
  readonly price: number;
}
