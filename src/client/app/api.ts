import axios from 'axios';
import { ISearchParam } from '../interface/filter.interface';

export function getStores(searchParams: ISearchParam) {
  return axios.get('/api/stores', { params: searchParams });
}
