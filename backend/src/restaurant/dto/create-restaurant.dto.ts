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

 constructor(idUser: number, name: string, address: string, phoneNumber: string, latitude: number, longitude: number) {
    this.idUser = idUser;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.latitude = latitude;
    this.longitude = longitude;
 }

}