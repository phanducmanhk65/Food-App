import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {

@IsNotEmpty()
totalPrice: number;

@IsNumber()
status: number;

imageUrl: string;

}
