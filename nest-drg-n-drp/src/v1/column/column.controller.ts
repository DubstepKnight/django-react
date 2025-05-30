import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller({path: 'columns', version: '1'})
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    try {
      return this.columnService.create(createColumnDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.columnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(id);
  }
}
