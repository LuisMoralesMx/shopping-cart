import { Get, Route, Tags } from "tsoa";

interface ProductResponse {
    message: string;
}

@Route("api/products")
@Tags('product')
export default class ProductsController {
    @Get("/")
    public async getProducts(): Promise<ProductResponse> {
        return {
            message: "Fetch a list of products",
        };
    }

    @Get("/{productId}")
    public async getProductById(): Promise<ProductResponse> {
        return {
            message: "Fetch a list of products",
        };
    }
}