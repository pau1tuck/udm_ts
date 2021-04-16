import { ObjectType, Field, ID } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    socialId!: string;

    @Field()
    @Column({ length: 128, nullable: true })
    firstName!: string;

    @Field()
    @Column({ length: 128, nullable: true })
    lastName!: string;

    @Field()
    @Column({ length: 128, nullable: true })
    country!: string;

    @Field()
    @Column({ nullable: true })
    avatar!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field()
    @Column({ default: false })
    verified!: boolean;

    @Field(() => [String], { nullable: true })
    @Column("simple-array", { nullable: true })
    roles?: string[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;
}
