import { OrderType } from '../order';

export interface FetchOptions {
  pageSize: number;
  page: number;
  orderBy: string;
  order: OrderType;
  search: string;
}
