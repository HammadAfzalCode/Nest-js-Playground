// src/products/domain/ports/products.repository.interface.ts
import { ProductEntity } from '../entities/product.entity.js';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface IProductsRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
}
