import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule, PrismaModule],
  controllers: [BoardController],
  providers: [BoardService, PrismaService],
})
export class BoardModule {}
