import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  CreateCategoryResponseDto,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateCategoryResponseDto,
} from './dto/update-category.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ type: CreateCategoryResponseDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ type: CategoryDto, isArray: true })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  @ApiResponse({ type: CategoryDto })
  findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Patch(':name')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ type: UpdateCategoryResponseDto })
  update(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name);
  }
}
