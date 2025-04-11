import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PickType(User, [
  'firstName',
  'lastName',
  'email',
  'password',
  'picture',
  'phoneNumber',
] as const) {
  @ApiProperty({
    description: 'The first name of the user',
    required: false,
    example: 'John',
    type: 'string',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    required: false,
    example: 'Doe',
    type: 'string',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    required: true,
    example: 'john@example.com',
    type: 'string',
  })
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
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    description: 'The picture URL of the user',
    required: false,
    example: 'https://example.com/profile-picture.jpg',
    type: 'string',
  })
  @IsUrl()
  picture: string;

  @ApiProperty({
    description: 'The phone number of the user',
    required: false,
    example: '+1 123-456-7890',
    type: 'string',
  })
  @IsString()
  phoneNumber: string;
}
