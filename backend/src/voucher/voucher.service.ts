import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './voucher.entity';

@Injectable()
export class VoucherService {
  async updateVoucher(
    id: number,
    code: string,
    discountPercent: number,
    expiredAt: Date,
  ): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOne({ where: { id } });

    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }

    voucher.code = code;
    voucher.discountPercent = discountPercent;
    voucher.expiredAt = expiredAt;

    return this.voucherRepository.save(voucher);
  }

  async deleteVoucher(id: number): Promise<void> {
    const voucher = await this.voucherRepository.findOne({ where: { id } });

    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }

    await this.voucherRepository.remove(voucher);
  }
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  async createVoucher(
    code: string,
    discountPercent: number,
    expiredAt: Date,
  ): Promise<Voucher> {
    const voucher = this.voucherRepository.create({
      code,
      discountPercent,
      expiredAt,
    });
    return this.voucherRepository.save(voucher);
  }
  async getVoucherById(id: number): Promise<Voucher | undefined> {
    return this.voucherRepository.findOne({ where: { id } });
  }

  async getVoucherByCode(code: string): Promise<Voucher | undefined> {
    return this.voucherRepository.findOne({ where: { code } });
  }

  async getAllVouchers(): Promise<Voucher[]> {
    return this.voucherRepository.find();
  }
}
