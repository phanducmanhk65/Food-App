import { IsNotEmpty } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    name: string;
    
    address: string;
    
    phoneNumber: string;
}
