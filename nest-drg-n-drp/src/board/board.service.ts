import { Injectable } from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Board } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateBoardDto): Promise<Board> {
    try {
      const result = await this.prisma.board.create({ data });
      return result;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.board.findMany();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.board.findFirst({
        where: {
          id: id,
        },
        include: {
          Column: {
            include: {
              Card: true,
            },
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    try {
      const result = await this.prisma.board.update({
        where: {
          id: id,
        },
        data: updateBoardDto,
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.board.delete({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}
