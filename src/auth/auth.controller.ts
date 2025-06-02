import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';

interface RequestWithUser extends Request {
    user: {
        username: string;
        role: string;
    };
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(
        @Body()
        registerDto:RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    //Ruta protegida con guard
    @Get('profile')
    @Roles(Role.ADMIN) // Solo para admin
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req() req: RequestWithUser,
    ) {
        return this.authService.profile(req.user);
    }
    
}
