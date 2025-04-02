import { Entity, Column } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @ApiProperty({
        example: "janedoe",
        description: "Username for login and identification",
    })
    @Column()
    userName: string;

    @ApiProperty({
        example: "jane_doe@example.com",
        description: "Email address of the user",
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: "Password123!",
        description: "User password (hashed when stored)",
    })
    @Column()
    @Exclude()
    password: string;

    @ApiProperty({
        description: "Secret for two-factor authentication",
        required: false,
    })
    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @ApiProperty({
        description: "Whether two-factor authentication is enabled",
        default: false,
    })
    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    @ApiProperty({
        description: "API key for accessing protected resources",
    })
    @Column({ type: 'text' })
    apiKey: string;

    @ApiProperty({
        description: "User role for authorization",
        enum: ['user', 'admin'],
        default: 'user',
    })
    @Column({ type: 'varchar', default: 'user' })
    role: string;
}