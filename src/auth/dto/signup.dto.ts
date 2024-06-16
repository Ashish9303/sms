import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto{
    @ApiProperty({
        description:'The Name the User.',
        required:true,
        example:'admin@example.com',
    })
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({
        description:'The email of the user.',
        required:true,
        example:'admin@example.com',
    })
    @IsNotEmpty()
    @IsString()
    email:string;

    @ApiProperty({
        description:'The Password of the user.',
        required:true,
        example:'password'
    })
    @IsNotEmpty()
    @IsString()
    password:string;
}