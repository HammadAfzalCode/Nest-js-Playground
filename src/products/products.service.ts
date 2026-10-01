// src/products/products.service.ts
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js'; // 👈 Direct DB Dependency
import { ConfigService } from '@nestjs/config'; // 👈 Direct Infra Dependency
import { CreateProductDto } from './dto/ceate-product.dto.js';
import { Product } from '@prisma/client'; // 👈 Database Schema Leaked as Domain Entity

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    // 1. Fetch dynamic rules from environment/config
    const maxDiscountCap =
      this.configService.get<number>('MAX_DISCOUNT_CAP') || 50;

    // 2. Business Discount Calculation Logic
    let discountedPrice = dto.price;
    const initialStock = 100;

    if (dto.price > 100 && initialStock > 50) {
      const discount = dto.price * 0.15;
      discountedPrice =
        discount > maxDiscountCap
          ? dto.price - maxDiscountCap
          : dto.price - discount;
    }

    // 3. Generate SKU
    const sku = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 4. DIRECT PRISMA QUERY INSIDE SERVICE METHOD
    try {
      const product = await this.prisma.product.create({
        data: {
          name: dto.name,
          price: dto.price,
          discountedPrice,
          sku,
          stock: initialStock,
        },
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Database failed to persist product record',
      );
    }
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }
}
