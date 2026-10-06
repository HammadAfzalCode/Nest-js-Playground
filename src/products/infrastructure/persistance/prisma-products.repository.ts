// src/products/infrastructure/persistence/prisma-products.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service.js';
import { IProductsRepository } from '../../domain/ports/products.repository.interface.js';
import { ProductEntity } from '../../domain/entities/product.entity.js';
@Injectable()
export class PrismaProductsRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(domainProduct: ProductEntity): Promise<ProductEntity> {
    // 1. Convert Domain Entity -> Prisma Data payload
    const raw = await this.prisma.product.create({
      data: {
        name: domainProduct.name,
        price: domainProduct.price,
        discountedPrice: domainProduct.discountedPrice,
        sku: domainProduct.sku,
        stock: domainProduct.stock,
      },
    });

    // 2. Map Prisma Database record -> Domain Entity
    return new ProductEntity(
      raw.id,
      raw.name,
      raw.price,
      raw.discountedPrice,
      raw.sku,
      raw.stock,
    );
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({ where: { id } });
    if (!raw) return null;
    return new ProductEntity(
      raw.id,
      raw.name,
      raw.price,
      raw.discountedPrice,
      raw.sku,
      raw.stock,
    );
  }

  async findAll(): Promise<ProductEntity[]> {
    const records = await this.prisma.product.findMany();
    return records.map(
      (raw) =>
        new ProductEntity(
          raw.id,
          raw.name,
          raw.price,
          raw.discountedPrice,
          raw.sku,
          raw.stock,
        ),
    );
  }
}
