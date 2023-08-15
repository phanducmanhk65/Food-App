import { IsNotEmpty } from "class-validator";

export class CreateDeliverInfoDto {

    @IsNotEmpty()
    shipperName: string;

    shipperPhoneNumber: string;
}
