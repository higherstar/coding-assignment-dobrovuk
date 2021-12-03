import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

import { StoreService } from './store.service';
import { StoreTransformer } from './store.transformer';

@Controller('v1/stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}


  @Get()
  @SerializeOptions({ groups: ['store'] })
  async getList(): Promise<StoreTransformer[]> {
    const stores = await this.storeService.getList();
    return stores.map((store) => new StoreTransformer(store));
  }

  /**
   * this endpoint should export all stores from database as a csv file
   * */
  @Get('export')
  @SerializeOptions({ groups: ['store', 'store.getOne'] })
  async export() {}

  @Get(':uuid')
  @SerializeOptions({ groups: ['store', 'store.getOne'] })
  async getOne(@Param('uuid') uuid: string) {
    const store = await this.storeService.getOne(uuid, ['hours']);
    if (!store) {
      throw new NotFoundException('No store found');
    }
    return new StoreTransformer(store);
  }
}
