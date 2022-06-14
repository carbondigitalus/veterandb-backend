// NPM Module
import { IsEmail, IsOptional, IsString } from 'class-validator';

// create edit user data class
// used for validating data is being manipulated correctly
export class EditUserDTO {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}
