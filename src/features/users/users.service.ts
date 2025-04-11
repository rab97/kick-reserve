import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MongoRepository } from 'typeorm';
import { Token } from '../../types/token.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserCode } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: MongoRepository<User>,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Gets all the users
     * @returns list of users
     */
    getUsers() {
        return this.usersRepository.find();
    }

    /**
     * Gets a user by its code
     * @param userCode user code identifier
     * @returns user by code
     */
    getUser(userCode: UserCode) {
        return this.usersRepository.findOneBy({ code: userCode });
    }

    /**
     * Updates the user with the specified code identifier
     * @param userCode user code identifier
     * @param dto user data
     */
    async updateUser(userCode: UserCode, dto: UpdateUserDto) {
        await this.usersRepository.update({ code: userCode }, dto);
    }
    /**
     * Retrieves a user by its id
     * @param userCode user unique identifier
     * @returns user
     */
    async findUser(userCode: UserCode) {
        const user = await this.usersRepository.findOneBy({
            code: userCode,
        });
        return user;
    }

    /**
     * Validates a user given its email and password
     * @param email the user's email address
     * @param password the user's password
     * @returns authenticated user or null if not authenticated
     */
    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;

            return result;
        }
        return null;
    }

    /**
     * Performs an authentication request
     * @param user user
     * @returns token from jwt service
     */
    async login(user: User): Promise<Token> {
        await this.usersRepository.update(user._id, {
            loginsCount: user.loginsCount ?? 0 + 1,
        });
        return {
            token: this.jwtService.sign({
                sub: user.code,
                email: user.email,
            }),
        };
    }

    /**
     * Updates the currently authenticated user's profile
     * @param user user to update profile
     * @param dto user update dto parameters
     */
    async updateMe(user: User, dto: UpdateUserDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        await this.usersRepository.update({ code: user.code }, dto);
    }

    /**
     * Creates a new user
     * @param user user to create profile
     */
    async createUser(dto: CreateUserDto) {
        const password = await bcrypt.hash(dto.password, 10);
        const newUser = new User(dto.email, password, dto.role);
        const user = await this.usersRepository.save(newUser);
        return this.login(user);
    }
}
