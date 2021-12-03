import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store, StoreHours } from 'data/models';
import { StoreRepository } from 'data/repositories';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreRepository, StoreHours])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
