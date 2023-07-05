import { Body, Controller, Get, Post, ParseIntPipe, HttpException } from '@nestjs/common';
import { Delete, Param, Patch, Query, Req, UseGuards } from '@nestjs/common/decorators';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';


@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UserService) { }

    @ApiOperation({ summary: 'Crea un usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario creado',
        type: User,
    })
    @Post()
    async create(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(user);
    }

    @ApiOperation({ summary: 'Obtiene todos los usuarios' })
    @ApiResponse({
        status: 200,
        description: 'Usuarios obtenidos',
        type: User,
    })
    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers(@Req() request: Request) {
        return this.usersService.getUsers();
    }


    @ApiOperation({ summary: 'Login de usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario logueado',
        type: User,
    })
    @ApiBody({ type: CreateUserDto }) // Importante: Asegúrate de importar y usar la clase UserDto adecuada para la documentación de Swagger
    @Post('login')
    login(@Body() user: CreateUserDto) {
        const { username, password } = user;
        return this.usersService.login(username, password);
    }

}
