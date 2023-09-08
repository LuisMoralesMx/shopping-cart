import { Order } from '../schemas/order.entity';
import { Product } from '../schemas/product.entity';
import { Cart } from '../schemas/cart.entity';

export class AppService {
  constructor(
  ) {}

  async getProducts(): Promise<any> {
    return Product.find().exec();
  }

  async getProductById(productId: string): Promise<any> {
    return Product.findOne({ id: productId }).exec();
  }

  async addProducts(product: any): Promise<any> {
    const productItem = new Product(product);
    return productItem.save();
  }

  async getCart(): Promise<any> {
    return Cart.find().exec();
  }

  async getOrder(id: string): Promise<any> {
    return Order.findOne({ id: id }).exec();
  }

  async createItemCart(cartModel: any) {
    let cartAvailable = false;

    const cartItem = new Cart(cartModel);

    await this.getCart().then((response) => {
      cartAvailable = response.filter((cart: { id: string; }) => cart.id === cartModel.id).length > 0;
    });

    // Check if a cart already exist if not, let's create a cart entry.
    if (!cartAvailable) {
      cartItem.save();
    } else {
      // If cart exist and there are items to add, let's create the items entry
      cartItem.updateOne({ id: cartModel.id }, cartModel);
    }
  }

  async updateCart(userId: string, itemId: string, count: number) {
    const cart: any = await this.getCart();

    if (cart?.items) {
      const updated = cart.items.map((item: any) => ({
        ...item,
        count: itemId === item.product.id ? count : item.count,
      }));

      Cart.updateOne({ userId: userId }, updated);
    }
  }

  deleteCart(cartId: string) {
    Cart.updateOne({ id: cartId }, { isDeleted: true });
  }
}
