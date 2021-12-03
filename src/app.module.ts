import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './modules/store/store.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), StoreModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
