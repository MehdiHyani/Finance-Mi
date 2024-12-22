import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'john' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'doe' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @ApiProperty({ example: 'Johndoe123' })
  password: string;
}

export class GetCurrenUserDto implements Omit<User, 'password'> {
  @ApiProperty({ example: 'cm3djx26l0000iyopkh6f19e0' })
  id: string;

  @ApiProperty({ example: 'john' })
  firstName: string;

  @ApiProperty({ example: 'doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'customer' })
  role: UserRole;

  @ApiProperty({ example: null, nullable: true })
  lastLogin: Date | null;

  @ApiProperty({ example: '2024-11-11T21:44:32.588Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-11T21:44:32.588Z' })
  updatedAt: Date;
}
