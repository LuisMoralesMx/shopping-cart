import { Delete, Get, Post, Put, Route, Tags } from "tsoa";

interface ProfileResponse {
    message: string;
}

@Route("api/profile/cart")
@Tags('cart')
export default class ProfileController {
    @Post("/")
    public async createCart(): Promise<ProfileResponse> {
        return {
            message: "Create User Cart",
        };
    }

    @Get("/")
    public async getCart(): Promise<ProfileResponse> {
        return {
            message: "Fetch User Cart",
        };
    }

    @Put("/")
    public async updateCart(): Promise<ProfileResponse> {
        return {
            message: "Update User Cart",
        };
    }

    @Delete("/")
    public async deleteCart(): Promise<ProfileResponse> {
        return {
            message: "Delete User Cart",
        };
    }

    @Post("/checkout")
    public async checkoutCart(): Promise<ProfileResponse> {
        return {
            message: "Checkout User Cart",
        };
    }
}