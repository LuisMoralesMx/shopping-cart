import { Delete, Get, Post, Put, Request, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";
import { CartModel } from "../schemas/cart.entity";
import { OrderEntity } from "../schemas/order.entity";

interface ProfileResponse {
    message: string;
}

@Route("api/profile/cart")
@Tags('cart')
export default class ProfileController {
    appService: AppService = new AppService();

    @Post("/")
    public async createCart(@Request() cart: CartModel) {
        this.appService.createItemCart(cart);
    }

    @Get("/")
    public async getCart(): Promise<CartModel[]> {
        return this.appService.getCart();
    }

    @Put("/")
    public async updateCart(@Request() cart: any) {
        this.appService.updateCart(cart.itemId, cart.count);
    }

    @Delete("/")
    public async deleteCart(@Request() cartId: number) {
        return this.appService.deleteCart(cartId);
    }

    @Get("/checkout")
    public async checkoutCart(@Request() userId: number): Promise<OrderEntity> {
        return this.appService.checkout(userId);
    }
}
