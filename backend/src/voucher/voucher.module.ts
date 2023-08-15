import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './voucher.entity'; // Đảm bảo đường dẫn ở đây chính xác
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
