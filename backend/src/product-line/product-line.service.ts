import { Injectable } from '@nestjs/common';
import { CreateProductLineDto } from './dto/create-product-line.dto';
import { UpdateProductLineDto } from './dto/update-product-line.dto';
import { Repository } from 'typeorm';
import { ProductLine } from './entities/product-line.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ProductLineService {
  constructor(@InjectRepository(ProductLine)
  private readonly ProductLineRepository : Repository<ProductLine>
    
  ){}
  create(createProductLineDto: CreateProductLineDto) {
    return this.ProductLineRepository.save(createProductLineDto);
  }

  findAll() {
    return this.ProductLineRepository.find();
  }

  findOne(id: number) {
    return this.ProductLineRepository.findOneBy({id});
  }

  update(id: number, updateProductLineDto: UpdateProductLineDto) {
    return this.ProductLineRepository.update(id,updateProductLineDto);
  }

  remove(id: number) {
    return this.ProductLineRepository.delete(id);
  }
}
