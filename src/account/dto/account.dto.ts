// NPM Modules
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// create auth data class for api validations
export class AccountDataModel {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
