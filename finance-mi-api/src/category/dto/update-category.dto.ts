import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateCategoryResponseDto {
  @ApiProperty({ description: 'Name of the updated category' })
  name: string;
}
