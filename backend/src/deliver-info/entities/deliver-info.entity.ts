import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class DeliverInfo {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    
    @Column()
    idShipper: number;
    
    @Column({
        nullable:true
    })
    shipperName: string;

    @Column({
        nullable:true
    })
    shipperPhoneNumber: number;

}