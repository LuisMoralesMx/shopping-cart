import { ProductEntity } from '../schemas/product.entity';
import { CartEntity, CartItemEntity } from '../schemas/cart.entity';
import { OrderEntity } from '../schemas/order.entity';
import { RepositoryService } from '../repository/store.repository';
import { catalogMock } from '..//mocks/catalog.mock';
import { userMock } from '..//mocks/user.mock';
import { UserEntity } from '../schemas/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class AppService {
    private repository: RepositoryService = new RepositoryService();

    getProducts(): ProductEntity[] {
        try {
            return catalogMock;
        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the products.' };
        }
    }

    getProductById(id: string): ProductEntity {
        try {
            return catalogMock.filter(cat => cat.id === id)[0];
        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the product.' };
        }
    }

    getCart(): CartEntity {
        return this.repository.cartStored;
    }

    getOrder(): OrderEntity {
        try {
            const cart = this.repository.cartStored;
            const user: UserEntity = userMock;

            let order: OrderEntity;

            if (cart !== null && cart.items.length > 0) {
                order = this.checkout(user, cart);
            }

            return order!;
        } catch (error) {
            throw { status: 400, message: 'An error has happened while getting the order.' };
        }
    }

    createItemCart(cart: CartEntity) {
        try {
            if (cart.items[0].productId) {
                const cartId = this.validateCartId(cart, userMock);

                const newItem = cart.items.map((item) => ({
                    count: item.count,
                    product: catalogMock.filter((catalog) => catalog.id === cart.items[0].productId)[0],
                }));

                this.repository.cartStored = {
                    id: cartId,
                    userId: userMock.id,
                    isDeleted: false,
                    items: this.repository.cartStored?.items ? this.repository.cartStored?.items.concat(newItem) : newItem,
                };
            }
        } catch (error) {
            throw { status: 400, message: 'Item could not be added to the cart' };
        }
    }

    fetchItems(): CartItemEntity[] {
        try {
            return this.repository.cartStored.items;
        } catch (error) {
            throw { status: 400, message: 'Item could not be retrieved' };
        }
    }

    updateCart(itemId: string, count: number) {
        try {
            if (this.repository.cartStored?.items) {
                const updated = this.repository.cartStored.items.map((item) => ({
                    ...item,
                    count: itemId === item.productId ? count : item.count,
                }));

                this.repository.cartStored.items = updated;
            }
        } catch (error) {
            throw { status: 400, message: 'Item could not be updated' };
        }
    }

    deleteCart(cartId: string) {
        try {
            if (this.repository.cartStored) {
                if (this.repository.cartStored.id === cartId) {
                    this.repository.cartStored.isDeleted = true;
                }
            }
        } catch (error) {
            throw { status: 400, message: 'Item could not be deleted' };
        }
    }

    checkout(user: UserEntity, cartItems: CartEntity): OrderEntity {
        try {
            return {
                id: uuidv4(),
                userId: user.id,
                cartId: '4e2752c3-00c0-4647-8caf-f27c4e9bbd61',
                items: cartItems.items,
                payment: {
                    type: 'Credit Card',
                    address: 'Los Angeles 1225',
                    creditCard: '000000000000',
                },
                delivery: {
                    type: 'Post',
                    address: 'Los Angeles 1225',
                },
                comments: '',
                status: 'created',
                total: cartItems.items.reduce((previousVal, currentVal) => {
                    return previousVal + currentVal.product.price * currentVal.count;
                }, 0),
            };
        } catch (error) {
            throw { status: 400, message: 'An error has happened while checking out the order.' };
        }
    }

    validateCartId(cart: CartEntity, user: UserEntity): any {
        let cartId = null;

        if (cart.id) {
            // If exists, validate if the cartId for the current user.
            if (cart.userId === user.id) {
                cartId = cart.id;
            } else {
                throw { status: 400, message: 'User Id do not match' };
            }
        } else {
            // If it does not exist, a new one is generated.
            cartId = uuidv4();
        }
        return cartId;
    }
}