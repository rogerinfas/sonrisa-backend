import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";
export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @Transform(({ value }) => value.trim())// Espacis en blanco
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}