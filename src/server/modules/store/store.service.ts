import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm';

import { Store } from 'server/data/models';
import { StoreRepository } from 'server/data/repositories';
import { FiltersDto } from './dto/filters.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {}

  getOne(storeUUID: string, relations = []) {
    return this.storeRepository.findOne({
      where: { uuid: storeUUID },
      relations,
    });
  }

  async getList(filterParams: FiltersDto): Promise<Store[]> {
    const {
      offset,
      limit,
      searchQuery,
      lat,
      lan,
      weekday,
      startHour,
      endHour
    } = filterParams;

    const queryBuilder = this.storeRepository
      .createQueryBuilder('stores')
      .select([
        'stores.uuid AS uuid',
        'stores.address AS address',
        'stores.email AS email',
        'stores.lat AS lat',
        'stores.long AS long',
        'stores.name AS name',
        'stores.sort_order AS sortOrder',
      ])

    queryBuilder
      .offset((offset - 1) * limit)
      .limit(limit);

    return await queryBuilder.execute();
  }
}
