import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty({
        description:'The UserName or Email of the User.',
        required:true,
        example:'admin@example.com',
    })
    email:string;

    @ApiProperty({
        description:'The Password of the user.',
        required:true,
        example:'password'
    })
    password:string;
}