import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @Transform(({ value }) => value.trim())// Espacis en blanco
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}