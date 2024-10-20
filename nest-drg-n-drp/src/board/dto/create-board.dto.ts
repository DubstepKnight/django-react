import { IsInt, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsInt()
  userId: number;
  @IsString()
  name: string;
}
