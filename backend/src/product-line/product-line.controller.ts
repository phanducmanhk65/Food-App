import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLineService } from './product-line.service';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';

@Controller('productline')
export class ProductLineController {
  constructor(private readonly productLineService: ProductLineService) {}

  @Post('/create')
  create(@Body() createProductLineDto: CreateProductLineDto) {
    return this.productLineService.create(createProductLineDto);
  }

  @Get('/all')
  findAll() {
    return this.productLineService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.productLineService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductLineDto: UpdateProductLineDto) {
    return this.productLineService.update(+id, updateProductLineDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productLineService.remove(+id);
  }
}
