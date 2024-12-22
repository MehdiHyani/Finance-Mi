import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInBody {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe123' })
  password: string;
}
