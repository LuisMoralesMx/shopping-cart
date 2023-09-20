import { Get, Query, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";

@Route("api/products")
@Tags("product")
export default class ProductsController {
  appService: AppService = new AppService();

  @Get("/")
  public async getProducts(): Promise<any> {
    return this.appService.getProducts();
  }

  @Get("/{productId}")
  public async getProductById(@Query() id: string): Promise<any> {
    return this.appService.getProductById(id);
  }
}
