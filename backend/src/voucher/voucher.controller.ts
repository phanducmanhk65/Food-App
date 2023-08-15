/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('/createvoucher')
  async createVoucher(
    @Body('code') code: string,
    @Body('discountPercent') discountPercent: number,
    @Body('expiredAt') expiredAt: Date,
  ) {
    return this.voucherService.createVoucher(code, discountPercent, expiredAt);
  }

  @Get('/allvoucher')
  async getAllVouchers() {
    return this.voucherService.getAllVouchers();
  }
  @Get('id/:id')
  async getVoucherById(@Param('id') id: number) {
    return this.voucherService.getVoucherById(id);
  }

  @Get(':code')
  async getVoucherByCode(@Param('code') code: string) {
    return this.voucherService.getVoucherByCode(code);
  }
  @Put('/:id')
  async updateVoucher(
    @Param('id') id: number,
    @Body('code') code: string,
    @Body('discountPercent') discountPercent: number,
    @Body('expiredAt') expiredAt: Date,
  ) {
    return this.voucherService.updateVoucher(
      id,
      code,
      discountPercent,
      expiredAt,
    );
  }

  @Delete('/:id')
  async deleteVoucher(@Param('id') id: number) {
    return this.voucherService.deleteVoucher(id);
  }

  @Post('/apply/:code')
  async applyVoucherToPayment(
    @Param('code') code: string,
    @Body('price') price: number,
  ) {
    const appliedVoucher = await this.voucherService.applyVoucherToPayment(
      code,
      price,
    );

    // Update your order's total amount here based on the appliedVoucher.totalAmount

    return appliedVoucher;
  }
}
