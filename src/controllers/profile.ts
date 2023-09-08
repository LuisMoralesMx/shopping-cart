import { Delete, Get, Post, Put, Request, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";

@Route("api/profile/cart")
@Tags('cart')
export default class ProfileController {
    appService: AppService = new AppService();

    @Post("/")
    public async createCart(@Request() cart: any) {
        this.appService.createItemCart(cart);
    }

    @Get("/")
    public async getCart(): Promise<any> {
        return this.appService.getCart();
    }

    @Put("/")
    public async updateCart(@Request() body: any) {
        this.appService.updateCart(body.userId, body.itemId, body.count);
    }

    @Delete("/")
    public async deleteCart(@Request() cartId: string) {
        return this.appService.deleteCart(cartId);
    }

    @Get("/checkout")
    public async checkoutCart(@Request() userId: string): Promise<any> {
        return this.appService.getOrder(userId);
    }
}
