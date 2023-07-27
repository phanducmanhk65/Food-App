import { Module } from '@nestjs/common';
import { DeliverInfoService } from './deliver-info.service';
import { DeliverInfoController } from './deliver-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverInfo } from './entities/deliver-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliverInfo])],
  controllers: [DeliverInfoController],
  providers: [DeliverInfoService]
})
export class DeliverInfoModule {}
