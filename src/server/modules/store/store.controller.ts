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
import { PaginationParamsDto } from './dto/pagination.dto';

@Controller('api/stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getList(
    @Query() paginationParams: PaginationParamsDto,
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
