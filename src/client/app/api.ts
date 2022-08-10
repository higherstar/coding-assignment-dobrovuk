import axios from 'axios';

export function getStores(searchParams) {
  return axios.get('/api/stores', { params: searchParams });
}
