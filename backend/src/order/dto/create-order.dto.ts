/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {

@IsNotEmpty()
totalPrice: number;

status: number;

@IsNotEmpty()
idCustomer: number;

@IsNotEmpty()
idRestaurant: number;

idShipper: number;


}
