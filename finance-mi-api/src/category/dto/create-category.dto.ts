import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsString()
  @ApiProperty({
    description: 'The name of the category',
    example: 'Utilities',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The URL of the category icon',
    example: 'https://example.com/icon.png',
  })
  IconUrl: string;
}

export class CreateCategoryResponseDto {
  @ApiProperty({ description: 'Name of the created category' })
  name: string;
}
