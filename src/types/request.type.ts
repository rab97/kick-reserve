import { User } from '../features/users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
    user: User;
}
