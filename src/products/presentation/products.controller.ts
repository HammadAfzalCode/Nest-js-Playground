import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case.js';
// import { FindAllProductsUseCase } from '../application/use-cases/find-all-products.use-case.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    // private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  //   @Get()
  //   findAll() {
  //     return this.findAllProductsUseCase.execute();
  //   }
}
