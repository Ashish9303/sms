import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel:Model<User>
    ){}
   
    
    async signUp(signUp):Promise<{token:string}>{
        const {name, email, password} = signUp;

        const hashPassword = await bcrypt.hash(password, 10);
        console.log("service");
        
        const user = await this.userModel.create({
            name,
            email,
            password:hashPassword
    })
    const token = this.jwtService.sign({id: user._id})
    return {token}
    }

    async validateUser(loginDto: LoginDto){
       const{email, password}= loginDto;
       const user = await this.userModel.findOne({email})
       if(!user){
        throw new UnauthorizedException({user : 'Invalid Credential'})
       }

       const isPasswordMatch = await bcrypt.compare(password,user.password)

       if(!isPasswordMatch){
        throw new  UnauthorizedException({password:'Invalid Credential'})
       }
       const token = this.jwtService.sign({id: user._id})
       return {token}
    }
   
}