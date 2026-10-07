import { Module } from '@nestjs/common';
import { ProductsController } from './presentation/products.controller.js';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case.js';
// import { FindAllProductsUseCase } from './application/use-cases/find-all-products.use-case.js';
import { PRODUCTS_REPOSITORY } from './domain/ports/products.repository.interface.js';
import { PrismaProductsRepository } from './infrastructure/persistance/prisma-products.repository.js';

@Module({
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    // FindAllProductsUseCase,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: PrismaProductsRepository,
    },
  ],
})
export class ProductsModule {}
