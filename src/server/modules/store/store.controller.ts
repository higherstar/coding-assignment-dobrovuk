import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { Store } from 'server/data/models';

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
  ): Promise<{
    listData: Store[],
    totalCount: number,
  }> {
    const data = await this.storeService.getList(filterParams);
    return data;
  }

  /**
   * this endpoint should export all stores from database as a csv file
   * */
  @Get('export')
  async export(@Res() res: Response) {
    const stores = await this.storeService.getAll();
    const data = plainToInstance(StoreTransformer, stores);
    const csv = data
      .map((row) => Object.entries(row).map((field) => field[1]).join(','))
      .join('\r\n');

    res.set('Content-Disposition', 'attachment; filename=stores.csv');
    res.end(csv);
  }
}
