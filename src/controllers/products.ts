import { Get, Query, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";
import { ProductModel } from "../schemas/product.entity";

@Route("api/products")
@Tags('product')
export default class ProductsController {
    appService: AppService = new AppService();

    @Get("/")
    public async getProducts(): Promise<ProductModel[]> {
        return this.appService.getProducts();
    }

    @Get("/{productId}")
    public async getProductById(@Query() id: number): Promise<ProductModel> {
        return this.appService.getProductById(id);
    }
}
