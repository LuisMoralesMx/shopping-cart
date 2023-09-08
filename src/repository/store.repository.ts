export class RepositoryService {
  cartStored: any;

  fetchItems(): any {
    return this.cartStored;
  }

  storeItem(item: any) {
    if (item !== null && item.count > 1) {
      this.cartStored.items.push(item);
    }
  }
}