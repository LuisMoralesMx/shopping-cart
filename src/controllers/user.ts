import { Get, Post, Request, Route, Tags } from "tsoa";
import { AppService } from "../services/app.service";
import { IUser } from "../schemas/user.entity";

@Route("/user")
@Tags('user')
export default class UserController {
    appService: AppService = new AppService();

    @Get("/")
    public async users(): Promise<any> {        
        return this.appService.getUsers();
    }

    @Get("/login")
    public async login(@Request() body: IUser): Promise<any> {        
        return this.appService.loginUser(body);
    }

    @Post("/register")
    public async register(@Request() body: IUser): Promise<any> {        
        return this.appService.registerUser(body);
    }
}
