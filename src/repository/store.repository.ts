import { CartEntity, CartItemEntity } from '../schemas/cart.entity';

export class RepositoryService {
  cartStored: CartEntity;

  fetchItems(): CartEntity {
    return this.cartStored;
  }

  storeItem(item: CartItemEntity) {
    if (item !== null && item.count > 1) {
      this.cartStored.items.push(item);
    }
  }
}