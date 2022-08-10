import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { StoreService } from './store.service';
import { StoreTransformer } from './store.transformer';
import { FiltersDto } from './dto/filters.dto';

@Controller('api/stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getList(
    @Query() filterParams: FiltersDto,
  ): Promise<StoreTransformer[]> {
    const stores = await this.storeService.getList();
    return plainToInstance(StoreTransformer, stores);
  }

  /**
   * this endpoint should export all stores from database as a csv file
   * */
  @Get('export')
  async export() {
    // todo
  }
}
