import { Delete, Get, Post, Put, Request, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";
import { CartEntity, UpdateEntity } from "../schemas/cart.entity";
import { UserEntity } from "../schemas/user.entity";
import { OrderEntity } from "../schemas/order.entity";

interface ProfileResponse {
    message: string;
}

@Route("api/profile/cart")
@Tags('cart')
export default class ProfileController {
    appService: AppService = new AppService();

    @Post("/")
    public async createCart(@Request() cart: CartEntity) {
        this.appService.createItemCart(cart);
    }

    @Get("/")
    public async getCart(): Promise<CartEntity> {
        return this.appService.getCart();
    }

    @Put("/")
    public async updateCart(@Request() cart: UpdateEntity) {
        this.appService.updateCart(cart.itemId, cart.count);
    }

    @Delete("/")
    public async deleteCart(@Request() cartId: string) {
        return this.appService.deleteCart(cartId);
    }

    @Get("/checkout")
    public async checkoutCart(@Request() user: UserEntity, @Request() cartItems: CartEntity): Promise<OrderEntity> {
        return this.appService.checkout(user, cartItems);
    }
}
