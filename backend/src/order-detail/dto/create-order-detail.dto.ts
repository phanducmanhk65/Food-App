import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDetailDto {

    @IsNumber()
    idOrder: number;

    @IsNumber()
    idDish: number;
    
    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    constructor(idOrder: number, idDish: number, price: number, quantity: number){
        this.idOrder = idOrder;
        this.idDish = idDish;
        this.price = price;
        this.quantity = quantity;
    }

}
