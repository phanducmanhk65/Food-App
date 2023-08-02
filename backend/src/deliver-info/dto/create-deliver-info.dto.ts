import { IsNotEmpty } from "class-validator";

export class CreateDeliverInfoDto {
    @IsNotEmpty()
    idShipper: number;

    shipperName: string;

    shipperPhoneNumber: number;

   constructor(idShipper: number, shipperName: string, shipperPhoneNumber: number) {
    this.idShipper = idShipper;
    this.shipperName = shipperName;
    this.shipperPhoneNumber = shipperPhoneNumber;
   }
}
