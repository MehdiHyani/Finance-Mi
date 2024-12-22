import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto,
      select: {
        name: true,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(name: string) {
    return this.prismaService.category.findUniqueOrThrow({ where: { name } });
  }

  update(name: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { name },
      data: updateCategoryDto,
      select: {
        name: true,
      },
    });
  }

  remove(name: string) {
    return this.prismaService.category.delete({ where: { name } });
  }
}
