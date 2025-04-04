import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateColumnDto {
  @IsUUID()
  boardId: string;

  @IsString()
  name: string;

  @IsInt()
  position: number;
}
