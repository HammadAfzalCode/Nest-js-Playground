import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type IProductsRepository,
  PRODUCTS_REPOSITORY,
} from '../../domain/ports/products.repository.interface.js';
import { ProductEntity } from '../../domain/entities/product.entity.js';
import { CreateProductDto } from '../../presentation/dto/create-product.dto.js';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly repository: IProductsRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: CreateProductDto): Promise<ProductEntity> {
    const maxCap = this.configService.get<number>('MAX_DISCOUNT_CAP') || 50;
    const sku = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 1. Instantiate pure Domain Entity
    const product = new ProductEntity(
      '',
      dto.name,
      dto.price,
      dto.price,
      sku,
      100,
    );

    // 2. Execute domain rule on the entity
    product.calculateDiscount(maxCap);

    // 3. Persist via abstract repository port
    return await this.repository.save(product);
  }
}
