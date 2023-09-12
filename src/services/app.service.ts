import { Order } from '../schemas/order.entity';
import { Product } from '../schemas/product.entity';
import { Cart } from '../schemas/cart.entity';
import { IUser, User } from '../schemas/user.entity';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

export class AppService {
  constructor(
  ) { }

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

  async deleteCart(cartId: string) {
    Cart.updateOne({ id: cartId }, { isDeleted: true });
  }

  async getUsers(): Promise<any> {
    return User.find().exec();
  }

  async registerUser(payload: IUser) {

    // Validate all the required payload is part of the request.
    if (!(payload.email && payload.password)) {
      throw { status: 400, message: "Email & Password are required." }
    }

    // Validate if user already exist in our database.
    const oldUser = await User.findOne({ email: payload.email })

    if (oldUser) {
      throw { status: 400, message: "User Already Exist. Please Login" }
    }

    // If it is a new user then encrypt password and create register.
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await User.create({
      id: uuidv4(),
      name: payload.name,
      email: payload.email.toLowerCase(),
      password: encryptedPassword,
      role: payload.role.toLowerCase() === 'admin' ? 'admin' : 'reader'
    })

    return `User successfully registered: ${JSON.stringify(payload)}`;
  }

  async loginUser(payload: IUser) {

    // Validate all the required payload is part of the request.
    if (!(payload.email && payload.password)) {
      throw { status: 400, message: "Email & Password are required." }
    }

    // Validate if user already exist in our database.
    const user = await User.findOne({ email: payload.email })

    if (!user) {
      throw { status: 400, message: "User does not exist." }
    }

    // If the user exist then proceed to the token generation
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      const token = jwt.sign({
        id: user.id, email: user.email, role: user.role
      }, process.env.TOKEN_KEY!, { expiresIn: "2h" });

      return token;
    }
  }
}
