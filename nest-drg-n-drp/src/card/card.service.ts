import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(readonly prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    try {
      const result = await this.prisma.card.create({ data: createCardDto });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.card.findMany();
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.card.findFirst({ where: { id: id } });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    try {
      const result = await this.prisma.card.update({
        where: { id: id },
        data: updateCardDto,
      });
      console.log('result: ', result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.card.delete({
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
