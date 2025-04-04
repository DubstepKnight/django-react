import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(readonly prisma: PrismaService) {}
  async create(createColumnDto: CreateColumnDto) {
    try {
      const result = await this.prisma.column.create({ data: createColumnDto });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.column.findMany();
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.column.findFirst({
        where: {
          id: id,
        },
      });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findByPosition(position: number) {
    try {
      const result = await this.prisma.column.findFirst({
        where: {
          position: position,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    try {
      const result = await this.prisma.column.update({
        where: {
          id: id,
        },
        data: updateColumnDto,
      });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.column.delete({
        where: {
          id: id,
        },
      });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }
}
