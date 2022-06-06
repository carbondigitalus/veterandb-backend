import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserData {
    @IsEmail()
    @IsOptional()
    email?: string;

}
