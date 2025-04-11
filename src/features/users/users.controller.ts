import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../types/request.type';
import { getScopeName } from '../../utils/string.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserCode } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { UsersService } from './users.service';

const scope = getScopeName(User.name);

@ApiTags(scope)
@ApiExtraModels(User)
@Controller(scope.toLowerCase())
export class UsersController {
    constructor(public readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    @ApiOperation({
        summary: 'Gets all users',
    })
    @ApiOkResponse({ type: [User] })
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: `Gets the currently authenticated user's profile` })
    @ApiOkResponse({ type: User })
    getMe(@Request() request: AuthenticatedRequest) {
        return request.user;
    }

    @Get(':code')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    @ApiOperation({
        summary: 'Gets the user given its code',
    })
    @ApiOkResponse({ type: User })
    getUser(@Param('code') code: UserCode) {
        return this.usersService.getUser(code);
    }

    @Patch(':code')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    @ApiOperation({
        summary: 'Updates the user given its code',
    })
    @ApiParam({
        name: 'code',
        description: 'The unique identifier of the user',
        type: 'string',
        required: true,
        example: '793da735-c1f7-4942-822c-9f7a7a3a842b',
    })
    updateUser(@Param('code') code: UserCode, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(code, dto);
    }

    @Patch('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: `Updates the currently authenticated user's profile`,
    })
    updateMe(@Request() request: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
        return this.usersService.updateMe(request.user, dto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({ type: String })
    @ApiOperation({ summary: 'Logs in a user with local credentials' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login(@Request() request: AuthenticatedRequest, @Body() dto: LoginDto) {
        return this.usersService.login(request.user);
    }

    @Post('signup')
    @ApiOperation({ summary: 'Signs up a new user with local credentials' })
    createUser(@Request() request: AuthenticatedRequest, @Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
