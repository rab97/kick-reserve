import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn } from 'class-validator';
import { ObjectId } from 'mongodb';
import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Player } from '../../players/entities/player.entity';
import { Role } from '../roles.enum';

export type UserCode = string;

@Entity({ name: 'User' })
export class User {
    constructor(email: string, password: string, role: Role) {
        this.code = uuid();
        this.loginsCount = 0;
        this.firstName = null;
        this.lastName = null;
        this.phoneNumber = null;
        this.picture = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.role = role;
        this.password = password;
        this.email = email;
    }
    /**
     * The document identifier
     */
    @ObjectIdColumn({
        name: 'id',
        comment: 'The document identifier',
        type: 'varchar',
    })
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        example: '5f8c85e2-85a2-4686-b339-3c495f736481',
        required: true,
        nullable: false,
        description: 'The document identifier',
        name: '_id',
    })
    _id: ObjectId;
    /**
     * The user code identifier
     */
    @Column({
        name: 'code',
        comment: 'The user code identifier',
        unique: true,
        nullable: false,
        type: 'varchar',
        default: uuid(),
    })
    @ApiProperty({
        type: 'string',
        description: 'The user code identifier',
        nullable: false,
        example: '793da735-c1f7-4942-822c-9f7a7a3a842b',
        required: true,
        format: 'uuid',
    })
    code: UserCode;

    /**
     * The user's first name
     */
    @Column({
        name: 'firstName',
        comment: "The user's first name",
        type: 'varchar',
        nullable: true,
        default: null,
    })
    @ApiProperty({
        type: 'string',
        description: "The user's first name",
        nullable: true,
        default: null,
        example: 'John',
        format: 'name',
    })
    firstName?: string | null;

    /**
     * The user's last name
     */
    @Column({
        name: 'lastName',
        type: 'varchar',
        comment: "The user's last name",
        nullable: true,
        default: null,
    })
    @ApiProperty({
        type: 'string',
        description: "The user's last name",
        nullable: true,
        default: null,
        example: 'Doe',
        format: 'name',
    })
    lastName?: string | null;

    /**
     * The user's email
     */
    @Column({
        name: 'email',
        unique: true,
        comment: "The user's email",
        type: 'varchar',
        nullable: false,
    })
    @ApiProperty({
        type: 'string',
        description: "The user's email",
        nullable: false,
        example: 'john.doe@example.com',
        format: 'email',
        required: true,
    })
    email: string;

    /**
     * The user's password
     */
    @Column({
        name: 'password',
        comment: "The user's password",
        type: 'varchar',
        nullable: false,
    })
    @ApiProperty({
        type: 'string',
        description: "The user's password",
        nullable: false,
        example: '$2b$10$8U79g0j6i302L39kZ9Z28O7y.g4s73780Q.x55U.Q4',
        required: true,
        format: 'password',
    })
    password: string;

    /**
     * The user's phone number
     */
    @Column({
        name: 'phoneNumber',
        comment: "The user's phone number",
        type: 'varchar',
        nullable: true,
        default: null,
    })
    @ApiProperty({
        type: 'string',
        description: "The user's phone number",
        nullable: true,
        default: null,
        format: 'phone',
        example: '+1 555-555-5555',
    })
    phoneNumber?: string | null;

    /**
     * The user' picture URL
     */
    @Column({
        name: 'picture',
        comment: "The user's picture URL",
        type: 'varchar',
        nullable: true,
        default: null,
    })
    @ApiProperty({
        type: 'string',
        nullable: true,
        default: null,
        format: 'uri',
        example: 'https://example.com/user-picture.jpg',
        description: "The user's picture URL",
        name: 'picture',
    })
    picture?: string | null;

    /**
     * Number of times the user has logged in
     */
    @Column({
        name: 'loginsCount',
        comment: 'Number of times the user has logged in',
        nullable: false,
        default: 0,
    })
    @ApiProperty({
        type: 'number',
        nullable: false,
        default: 0,
        description: 'Number of times the user has logged in',
        name: 'loginsCount',
        example: 10,
        required: true,
        format: 'int32',
        minimum: 0,
        maximum: 1000,
        exclusiveMinimum: false,
        exclusiveMaximum: false,
        multipleOf: 1,
        pattern: '^[0-9]+$',
        minLength: 0,
        maxLength: 5,
        minItems: 0,
        maxItems: 10,
    })
    loginsCount: number;

    /**
     * The role of the user
     */
    @Column({
        name: 'role',
        comment: 'The role of the user',
        nullable: false,
        type: 'string',
        default: Role.CUSTOMER,
    })
    @IsIn(Object.values(Role))
    @ApiProperty({
        type: 'string',
        enum: Object.values(Role),
        description: 'The role of the user',
        nullable: false,
        default: Role.CUSTOMER,
        example: Role.CUSTOMER,
        required: true,
        format: 'role',
        name: 'role',
    })
    role: Role;

    /**
     * The player linked to this user
     */
    @Column({
        name: 'player',
        comment: 'The player linked to this user',
        type: 'varchar',
        nullable: true,
        default: null,
    })
    @ApiProperty({
        type: 'string',
        nullable: true,
        default: null,
        format: 'uuid',
        example: '5f8c85e2-85a2-4686-b339-3c495f736481',
        description: 'The player linked to this user',
        name: 'player',
        required: false,
        link: () => Player,
    })
    @OneToOne(() => Player, player => player.user)
    player?: Player;

    /**
     * The date when this entity was created
     */
    @CreateDateColumn({
        name: 'createdAt',
        type: 'timestamp',
        comment: 'The date when this entity was created',
    })
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        description: 'The date when this entity was created',
        nullable: false,
        example: '2020-09-15T12:34:56Z',
        required: true,
        name: 'createdAt',
        readOnly: true,
    })
    @Type(() => Date)
    createdAt: Date;

    /**
     * The date when this entity was updated
     */
    @UpdateDateColumn({
        name: 'updatedAt',
        type: 'timestamp',
        comment: 'The date when this entity was updated',
    })
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        description: 'The date when this entity was updated',
        nullable: false,
        example: '2020-09-15T12:34:56Z',
        required: true,
        name: 'updatedAt',
        readOnly: true,
    })
    @Type(() => Date)
    updatedAt: Date;
}
