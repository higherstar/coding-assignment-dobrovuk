export interface IPagination {
  offset: number;
  limit: number;
}

export interface IFilterParam {
  searchQuery?: string;
  lat?: number;
  lan?: number;
  weekday?: number;
  startHour?: string;
  endHour?: string;
}

export interface ISearchParam extends IPagination, IFilterParam {}
