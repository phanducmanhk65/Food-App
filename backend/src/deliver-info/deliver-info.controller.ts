import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { DeliverInfoService } from './deliver-info.service';
import { CreateDeliverInfoDto } from './dto/create-deliver-info.dto';
import { UpdateDeliverInfoDto } from './dto/update-deliver-info.dto';

@Controller('deliver-info')
export class DeliverInfoController {
  constructor(private readonly deliverInfoService: DeliverInfoService) {}

  @Post()
  create(@Body() createDeliverInfoDto: CreateDeliverInfoDto) {
    return this.deliverInfoService.create(createDeliverInfoDto);
  }

  @Get()
  findAll() {
    return this.deliverInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverInfoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeliverInfoDto: UpdateDeliverInfoDto) {
    return this.deliverInfoService.update(+id, updateDeliverInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverInfoService.remove(+id);
  }
}
