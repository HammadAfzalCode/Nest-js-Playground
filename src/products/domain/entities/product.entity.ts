// src/products/domain/entities/product.entity.ts

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public discountedPrice: number,
    public sku: string,
    public stock: number,
  ) {}

  // Pure domain logic: Calculation is encapsulated directly inside the entity!
  public calculateDiscount(maxDiscountCap: number): void {
    if (this.price > 100 && this.stock > 50) {
      const discount = this.price * 0.15;
      const finalDiscount =
        discount > maxDiscountCap ? maxDiscountCap : discount;
      this.discountedPrice = this.price - finalDiscount;
    } else {
      this.discountedPrice = this.price;
    }
  }
}
