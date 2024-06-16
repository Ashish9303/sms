import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor( private readonly authService:AuthService){}

    @Post('/signup')
    @ApiOperation({
        summary:'User Signup',
        description:'This endpoint used for user signup',
    })
    async signup(@Body() signUp: SignUpDto):Promise<{token:string}>{
        try{
            
            
            return this.authService.signUp(signUp);


        }catch(error){
          
        }
    }

 @Post('/login')
 @ApiOperation({
    summary:'User Login',
    description:'This endpoint used for login user.'
 })
 async Login(@Body()login:LoginDto){
    try {
        const user = await this.authService.validateUser(login)
        return user;
    } catch (error) {
        
    }
 }

}