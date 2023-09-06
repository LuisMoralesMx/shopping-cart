import { ProductModel } from '../schemas/product.entity';
import { CartModel } from '../schemas/cart.entity';
import { RepositoryService } from '../repository/store.repository';
import { PrismaClient } from '@prisma/client';

export class AppService {
    repository: RepositoryService;
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.repository = new RepositoryService();
    }

    async getProducts(): Promise<ProductModel[]> {
        try {
            const products = await this.prisma.product.findMany();
            return products;

        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the products.' };
        }
    }

    async getProductById(productId: number): Promise<ProductModel> {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: productId,
                }
            });

            return product!;
        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the product.' };
        }
    }

    async getCart(): Promise<CartModel[]> {
        try {
            const products = await this.prisma.cart.findMany();
            return products;
        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the cart.' };
        }
    }

    async createItemCart(cart: CartModel) {
        let createCart: CartModel;
        let createItems: any;

        try {
            const findCart = await this.prisma.cart.findUnique({
                where: {
                    id: cart.userId,
                },
            });

            // Check if a cart already exist if not, let's create a cart entry.
            if (!findCart) {
                createCart = await this.prisma.cart.create({
                    data: {
                        userId: cart.userId,
                        isDeleted: cart.isDeleted!,
                    },
                });
            }

            // Assign Cart Id
            const cartId = findCart?.id ? findCart.id : createCart!.id;

            // If cart exist and there are items to add, let's create the items entry
            if (cartId && cart.items && cart.items) {
                createItems = await this.prisma.cartItem.create({
                    data: {
                        count: cart.items.count,
                        cartId: cartId,
                        productId: cart.items.productId,
                    },
                });

                return createItems;
            }
        } catch (error) {
            throw { status: 400, message: 'Item could not be added to the cart' };
        }
    }

    async updateCart(itemId: number, count: number) {
        try {
            const updateQuantity = await this.prisma.cartItem.update({
                where: {
                    id: +itemId,
                },
                data: {
                    count: +count,
                },
            });
            console.log(updateQuantity);
            return updateQuantity;

        } catch (error) {
            throw { status: 400, message: 'Item could not be updated' };
        }
    }

    async deleteCart(cartId: number) {
        try {
            // 1st. Delete any reference to the cartId in the 'CartItem' table.
            const deleteCartItems = await this.prisma.cartItem.deleteMany({
                where: {
                    cartId: {
                        equals: cartId,
                    },
                },
            });

            // 2nd. Delete any reference to the cartId in the 'Cart' table.
            const deleteCart = await this.prisma.cart.delete({
                where: {
                    id: cartId,
                },
            });

            return {
                deletedCart: deleteCart,
                deletedCartItems: deleteCartItems,
            };

        } catch (error) {
            throw { status: 400, message: 'Item could not be deleted' };
        }
    }

    async checkout(userId: number): Promise<any> {
        try {
            const result = await this.prisma.$queryRaw`SELECT
          (SELECT USR.NAME
            FROM PUBLIC."User" USR
            WHERE USR."id" = 1) AS NAME,
        
          (SELECT PDT.TITLE
            FROM PUBLIC."Product" PDT
            WHERE PDT.ID = ITM."productId") AS TITLE,
        
          (SELECT PDT.DESCRIPTION
            FROM PUBLIC."Product" PDT
            WHERE PDT.ID = ITM."productId") AS PRODUCT,
        
          (SELECT PDT.PRICE
            FROM PUBLIC."Product" PDT
            WHERE PDT.ID = ITM."productId") AS PRICE,
          ITM.COUNT
          FROM PUBLIC."Cart" CRT
          LEFT JOIN PUBLIC."CartItem" ITM ON (CRT.ID = ITM."cartId")
          WHERE CRT."userId" = ${+userId}`;

            return result;

        } catch (error) {
            throw { status: 400, message: 'An error has happened while checking out the order.' };
        }
    }

}