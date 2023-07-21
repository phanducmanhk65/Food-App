import { IsEmpty } from "class-validator";

export class CreateProductLineDto {
    @IsEmpty()
    name: string;
    description: string;
}
