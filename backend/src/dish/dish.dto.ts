/* eslint-disable prettier/prettier */
import { MinLength, IsNotEmpty, IsNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class DishDto {
@IsNotEmpty()
productline: string;

@IsNotEmpty()
name: string;

@IsNumber()
price: number;

@IsNumber()
idRestaurant: number;

imageUrl: string;

constructor(productline: string, name: string, price: number, idRestaurant: number, imageUrl: string) {
    this.productline = productline;
    this.name = name;
    this.price = price;
    this.idRestaurant = idRestaurant;
    this.imageUrl = imageUrl;
}
}
