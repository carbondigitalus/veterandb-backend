// NPM Modules
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength,
    IsArray
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

// Custom Modules
import { ValidateMatch } from './../utils/decorators';
import {
    AccountStatus,
    AccountType,
    AccountVerified,
    UserRole
} from './../utils/enums';

@Entity()
export default class User {
    // COLUMNS
    @PrimaryGeneratedColumn('uuid')
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    firstName?: string;

    @Column()
    @IsString()
    lastName?: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @MinLength(12, { message: 'Passwords can not be less than 12 characters.' })
    @MaxLength(60, { message: 'Passwords can not exceed 60 characters.' })
    @Matches(
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}){12,60}$/,
        {
            message:
                'Password Strength Requirements: 1 uppercase, 1 lowercase, 1 number and 1 special character. Authorized special characters are !@#$%^&*()-_+.'
        }
    )
    password: string;

    @Column({ type: 'varchar' })
    @IsString()
    @ValidateMatch('password', { message: 'Passwords do not match.' })
    passwordConfirm: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Customer
    })
    userRole: UserRole;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.Active
    })
    accountStatus: AccountStatus;

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.Veteran
    })
    accountType: AccountType;

    @IsArray()
    @Column({
        type: 'enum',
        enum: AccountVerified,
        default: AccountVerified.None
    })
    accountVerified?: AccountVerified[];

    @Column({
        type: 'boolean',
        default: true
    })
    @IsBoolean()
    isActiveAccount: boolean;

    @Column({ type: 'date', default: null })
    @IsDate()
    passwordChangedAt?: Date;

    @Column({ default: null })
    @IsString()
    passwordResetToken?: string;

    @Column({ default: null })
    @IsDate()
    passwordResetExpires?: Date;
}
