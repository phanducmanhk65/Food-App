import { Module } from '@nestjs/common';
import { ProductLineService } from './product-line.service';
import { ProductLineController } from './product-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLine } from './entities/product-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLine])],
  controllers: [ProductLineController],
  providers: [ProductLineService]
})
export class ProductLineModule {}
