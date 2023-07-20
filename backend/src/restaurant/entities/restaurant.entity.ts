import { Entity,PrimaryGeneratedColumn, Column, Double  } from "typeorm";


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        nullable: false
    })
    idUser:number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        nullable: true
    })
    phoneNumber: string;

    @Column({
    nullable: true,
      type: 'double'
    })
    latitude: number;

    @Column({
        nullable: true,
        type: 'double'
    })
    longitude: number;


}