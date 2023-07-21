import { Injectable } from '@nestjs/common';
import { CreateDeliverInfoDto } from './dto/create-deliver-info.dto';
import { UpdateDeliverInfoDto } from './dto/update-deliver-info.dto';

@Injectable()
export class DeliverInfoService {
  create(createDeliverInfoDto: CreateDeliverInfoDto) {
    return 'This action adds a new deliverInfo';
  }

  findAll() {
    return `This action returns all deliverInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliverInfo`;
  }

  update(id: number, updateDeliverInfoDto: UpdateDeliverInfoDto) {
    return `This action updates a #${id} deliverInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliverInfo`;
  }
}
