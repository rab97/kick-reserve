import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    type: 'string',
    example: 'john@example.com',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    type: 'string',
    example: 'password',
    required: true,
  })
  password: string;
}
