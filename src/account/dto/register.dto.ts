import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccountRegisterDTO {
    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;

    @IsString()
    passwordConfirm: string;
}
