import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './v1/auth/auth.module';
import { UserModule } from './v1/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './v1/board/board.module';
import { ColumnModule } from './v1/column/column.module';
import { CardModule } from './v1/card/card.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BoardModule,
    ColumnModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
