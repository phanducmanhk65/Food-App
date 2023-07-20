import { PartialType } from '@nestjs/swagger';
import { CreateDeliverInfoDto } from './create-deliver-info.dto';

export class UpdateDeliverInfoDto extends PartialType(CreateDeliverInfoDto) {}
