import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtDuration, jwtSecret } from './constants';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: jwtDuration,
            },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, LocalStrategy, JwtStrategy],
    exports: [UsersService],
})
export class UsersModule {}
