import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config:ConfigService) =>{
                return{
                    secret: config.get<string>('JWT_SECRET'),
                    private: config.get<string>('JWT_PVT'),
                    signOptions:{
                        expiresIn: config.get<string | number>  ('JWT_EXPIRE'),
                    }
                }
            }
        }),
    ],
    controllers:[AuthController],
    providers:[AuthService],  

})
export class AuthModule {}