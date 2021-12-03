import { Exclude, Expose, Transform } from 'class-transformer';
import { Store, StoreHours } from 'data/models';

@Exclude()
export class StoreHourTransformer {
  @Expose({ groups: ['hours'] })
  uuid: string;

  @Expose({
    groups: ['hours', 'store', 'store.getAllByTenant', 'upsert-active-hours'],
  })
  // @ts-ignore
  @Transform((val: string) => val.replace(/:\d{2}$/, ''), { groups: ['hours'] })
  from: string;

  @Expose({
    groups: ['hours', 'store', 'store.getAllByTenant', 'upsert-active-hours'],
  })
  // @ts-ignore
  @Transform((val: string) => val.replace(/:\d{2}$/, ''), { groups: ['hours'] })
  to: string;

  @Expose({ groups: ['hours', 'upsert-active-hours'] })
  type: number;

  @Expose({ groups: ['hours', 'upsert-active-hours'] })
  weekday: number;

  @Expose({ groups: ['hours'] })
  updatedAt: Date;

  @Expose({ groups: ['hours'] })
  createdAt: Date;

  @Expose({ groups: ['hours'] })
  store: Store;

  constructor(partial: Partial<StoreHours>) {
    Object.assign(this, partial);
  }
}
