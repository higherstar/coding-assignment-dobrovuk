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

  async getList(filterParams: FiltersDto): Promise<{
    listData: Store[],
    totalCount: number,
  }> {
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
      .select(['stores.*']);

    if (searchQuery) {
      queryBuilder
        .andWhere("stores.name LIKE :search")
        .setParameter('search', `%${searchQuery}%`);
    }

    queryBuilder
      .offset((offset - 1) * limit)
      .limit(limit);

    const totalCount = await new SelectQueryBuilder(queryBuilder).getCount();
    const listData = await queryBuilder.execute();

    return {
      totalCount,
      listData,
    }
  }
}
