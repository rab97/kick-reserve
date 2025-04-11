import { UserCode } from './user.entity';

export class JwtTokenPayload {
    sub: UserCode;
    email: string;
}
