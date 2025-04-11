import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../roles.enum';

export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'role',
] as const) {
  @ApiProperty({
    description: 'The email of the user',
    required: true,
    example: 'john@example.com',
    type: 'string',
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    example: 'password',
    type: 'string',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    required: true,
    example: 'admin',
    type: 'string',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  role: Role;
}
