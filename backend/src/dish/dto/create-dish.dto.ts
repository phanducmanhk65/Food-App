import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDishDto {

@IsNotEmpty()
productLine: string;

@IsNotEmpty()
name: string;

@IsNumber()
price: number;

@IsNumber()
idRestaurant: number;

}
