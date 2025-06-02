import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register(registerDto: RegisterDto) {
        return await this.usersService.create(registerDto);
    }

    async login(loginDto:LoginDto) {
        const user = await this.usersService.findOneByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('User not found(username)');
        }

        // Si existe comapra contraseñas
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }
        // Ahora token JWT
        const payload = { username: user.username, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
        };
    }
}
