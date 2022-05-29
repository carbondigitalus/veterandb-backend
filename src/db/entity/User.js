// Core Modules
const crypto = require('crypto');

// NPM Modules
import bcrypt from 'bcrypt';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength
} from 'class-validator';
import { NextFunction } from 'express';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';
import 'reflect-metadata';

// Custom Modules
import { Match } from './../decorators/match.decorator';
import { AccountStatus, UserRole } from './../../enums';

// Middlware Variables
let candidatePassword: string;
let userPassword: string;
@Entity()
export default class User {
    // COLUMNS
    @PrimaryGeneratedColumn('uuid')
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @Column()
    @IsString()
    @IsNotEmpty()
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
    @Match('password', { message: 'Passwords do not match.' })
    passwordConfirm: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.prototype.Customer
    })
    userRole: UserRole;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.prototype.Active
    })
    accountStatus: AccountStatus;

    @Column({
        type: 'boolean',
        default: true
    })
    @IsBoolean()
    isActiveAccount: boolean;

    @Column('date')
    @IsDate()
    passwordChangedAt: Date;

    @Column()
    @IsString()
    passwordResetToken: string;

    @Column()
    @IsDate()
    passwordResetExpires: Date;

    // MIDDLEWARE
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Hash the password with cost of 125
        this.password = await bcrypt.hash(this.password, 125);
        next();
    }
    @BeforeInsert()
    @BeforeUpdate()
    async resetPasswordConfirmation(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Delete the passwordConfirm field
        this.passwordConfirm = '';
        next();
    }
    @BeforeInsert()
    @BeforeUpdate()
    async updatePasswordChangedAtDate(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Add the passwordChangedAt date
        const updatedDate: Date = new Date();
        this.passwordChangedAt = updatedDate;
        next();
    }

    // METHODS
    get correctPassword() {
        return bcrypt.compare(candidatePassword, userPassword);
    }

    get changedPasswordAfter() {
        const newTime = (JWTTimestamp: Date) => {
            if (this.passwordChangedAt) {
                const convertTime = (
                    this.passwordChangedAt.getTime() / 1000
                ).toString();
                const convertTimeStamp = JWTTimestamp.getTime() / 1000;
                const changedTime = parseInt(convertTime, 10);
                // If JWTTimestamp is greater, this returns true, meaning that the password has been changed
                return convertTimeStamp < changedTime;
            }
            // False means that the password hasn't been changed
            return false;
        };
        return newTime;
    }

    get createPasswordResetToken() {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        // console.log({ resetToken }, this.passwordResetToken);
        // now + 10 minutes * 60 seconds per minute * 1000 to convert to miliseconds
        const minutesToAdd = 30;
        const currentDate = new Date();
        const convertedDate = new Date(
            currentDate.getTime() + minutesToAdd * 60000
        );
        this.passwordResetExpires = convertedDate;
        return resetToken;
    }
}
