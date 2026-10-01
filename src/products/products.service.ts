import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/ceate-product.dto.js';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }
}
