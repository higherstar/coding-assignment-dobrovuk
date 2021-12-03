import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as R from 'ramda';

import { Store } from 'data/models';
import { StoreHourTransformer } from './storeHour.transformer';

@Exclude()
export class StoreTransformer {
  @Expose()
  uuid;

  @Expose({ groups: ['store', 'store.getList'] })
  name;

  @Expose({ groups: ['store'] })
  slug;

  @Expose({ groups: ['store'] })
  @Transform((val) => !!val, { groups: ['store'] })
  status;

  @Expose({ groups: ['bootstrap', 'store'] })
  address;

  @Expose({ groups: ['store'] })
  email;

  @Expose({ groups: ['store'] })
  lat;

  @Expose({ groups: ['store'] })
  long;

  @Expose({ groups: ['store'] })
  sortOrder;

  @Expose({ groups: ['store.getAllByTenant', 'store.getOne'] })
  @Transform(R.ifElse(R.isEmpty, R.always(null), R.head), {
    groups: ['store.getAllByTenant', 'store.getOne'],
  })
  @Type(() => StoreHourTransformer)
  hours;

  constructor(partial: Partial<Store>) {
    Object.assign(this, partial);
  }
}
