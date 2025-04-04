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

  async findByPositionAndColumnId(cardPosition: number, columnId: string) {
    try {
      const result = await this.prisma.card.findFirst({
        where: {
          position: cardPosition,
          columnId: columnId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCardPosition(
    columnId: string,
    draggedCardId: string,
    oldPosition: number,
    newPosition: number,
  ) {
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const tempPosition = -1;
        const updateDraggedCardTemp = await prisma.card.update({
          where: {
            id: draggedCardId,
          },
          data: {
            position: tempPosition,
          },
        });

        if (!updateDraggedCardTemp) {
          throw new Error('Conflict detected while updating the card');
        }

        if (newPosition > oldPosition) {
          // Moving down
          console.log('moving down');
          await prisma.card.updateMany({
            where: {
              columnId: columnId,
              position: {
                gt: oldPosition,
                lte: newPosition,
              },
            },
            data: {
              position: {
                decrement: 1,
              },
            },
          });
        } else if (newPosition < oldPosition) {
          console.log('moving up');
          // Moving up
          await prisma.card.updateMany({
            where: {
              columnId: columnId,
              position: {
                gte: newPosition,
                lt: oldPosition,
              },
            },
            data: {
              position: {
                increment: 1,
              },
            },
          });
        }
        // Update the position of the dragged card
        await prisma.card.update({
          where: { id: draggedCardId },
          data: { position: newPosition },
        });
      });
      console.log('inner result: ', result);
      return result;
    } catch (error) {
      throw new Error(`Failed to update card positions: ${error.message}`);
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
