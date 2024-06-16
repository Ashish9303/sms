import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true,
    }),  
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      {name: User.name, schema:UserSchema},
    ]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService) =>{
        return{
            secret: config.get<string>('JWT_SECRET_KEY'),
            signOptions:{
                expiresIn: config.get<string | number>  ('JWT_EXPIRE'),
            }
        }
    }
    }),
    AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
