import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryDto implements Category {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: '12345-abcde',
  })
  name: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Utilities',
  })
  IconUrl: string;

  @ApiProperty({
    description: 'The date when the category was created',
    example: '2023-10-30T10:15:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the category was last updated',
    example: '2023-11-01T16:45:00.000Z',
  })
  updatedAt: Date;
}
