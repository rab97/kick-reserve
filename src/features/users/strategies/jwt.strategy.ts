import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../constants';
import { JwtTokenPayload } from '../entities/jwt-token-payload.entity';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate({ sub }: JwtTokenPayload) {
        const user = await this.usersService.findUser(sub);
        return user;
    }
}
