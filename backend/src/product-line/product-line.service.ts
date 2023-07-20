import { Injectable } from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';

@Injectable()
export class ProductLineService {
  create(createProductLineDto: CreateProductLineDto) {
    return 'This action adds a new productLine';
  }

  findAll() {
    return `This action returns all productLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productLine`;
  }

  update(id: number, updateProductLineDto: UpdateProductLineDto) {
    return `This action updates a #${id} productLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} productLine`;
  }
}
