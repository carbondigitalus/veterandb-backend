// Core Modules
import crypto from 'crypto';
// NPM Modules
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
// Custom Modules
import { User } from './../db/entity';

// Middlware Variables
// let candidatePassword: string;
// let userPassword: string;
// let passwordResetToken: any;
// let passwordResetExpires: any;

export const UserMiddleware = dataSource.getRepository(User).extend({
    async hashPassword(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Hash the password with cost of 125
        this.password = await bcrypt.hash(this.password, 125);
        next();
    },

    async resetPasswordConfirmation(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Delete the passwordConfirm field
        this.passwordConfirm = '';
        next();
    },

    async updatePasswordChangedAtDate(next: NextFunction) {
        // If the password was not modified exit middleware
        if (!this.password) return next();
        // Add the passwordChangedAt date
        const updatedDate: Date = new Date();
        this.passwordChangedAt = updatedDate;
        next();
    },

    // METHODS
    get correctPassword() {
        return bcrypt.compare(candidatePassword, userPassword);
    },

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
    },

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
});
