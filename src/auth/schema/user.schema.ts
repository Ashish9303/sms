import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    collection:'core_user',
    timestamps:true,
    versionKey:false,
})

export class User {
    @Prop({type:'ObjectId', auto:true})
    _id:string;

    @Prop({required:true, unique:true})
    name:string;

    @Prop({required:true, unique:true})
    email:string;

    @Prop({required:true, unique:true})
    password:string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);