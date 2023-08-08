/* eslint-disable prettier/prettier */
import { Entity,PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: "id"
    })
    id: number;

    @Column({
      nullable:false
    })
    username: string;
    
    @Column({
        name: 'password',
        nullable: false
    })
    password: string;

    @Column({
        name: 'name',
        nullable: true
    })
    name: string;

    @Column({
        name: 'address',
        nullable:true
    })
    address: string;

    @Column({
        name: 'phonenumber',
        nullable: true
    })
    phoneNumber: string;

    @Column({ nullable: true })
  imageUrl: string;
}