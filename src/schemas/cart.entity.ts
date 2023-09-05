import { ProductEntity } from './product.entity';

export interface CartItemEntity {
  productId?: string;
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface UpdateEntity {
  itemId: string; 
  count: number;
}