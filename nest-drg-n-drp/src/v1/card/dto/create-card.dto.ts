import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsUUID()
  columnId: string;

  @IsInt()
  position: number;

  @IsString()
  content: string;
}
