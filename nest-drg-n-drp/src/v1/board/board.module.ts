import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { BoardGateway } from './board.gateway';
import { CardModule } from 'src/v1/card/card.module';
import { ColumnModule } from 'src/v1/column/column.module';
import { AuthModule } from 'src/v1/auth/auth.module';

@Module({
  imports: [PrismaModule, PrismaModule, CardModule, ColumnModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService, PrismaService, BoardGateway],
})
export class BoardModule {}
