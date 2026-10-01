import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Product name must be at least 3 characters long' })
  name: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
