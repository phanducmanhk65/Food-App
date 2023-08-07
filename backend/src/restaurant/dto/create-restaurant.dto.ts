import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
 
 @IsNumber()
 idUser: number;
 @IsNotEmpty()
 name: string;
 address: string;
 @IsNotEmpty()
 phoneNumber: string;
 latitude: number;
 longitude: number;

}