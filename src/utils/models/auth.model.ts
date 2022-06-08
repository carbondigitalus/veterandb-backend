// NPM Modules
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// create auth data class for api validations
export class AuthDataModel {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
