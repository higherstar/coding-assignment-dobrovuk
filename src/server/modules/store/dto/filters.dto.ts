import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

const DEFAULT_PAGE_LIMIT = 10;
const MAX_PAGE_LIMIT = 1000;

const transformPage = (page: number): number => {
  page = Number(page);
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  return page;
};

const transformLimit = (limit: number): number => {
  limit = Number(limit);
  if (isNaN(limit) || limit <= 0 || limit > MAX_PAGE_LIMIT) {
    limit = DEFAULT_PAGE_LIMIT;
  }

  return limit;
};

export class FiltersDto {
  @IsOptional()
  @Transform((params) => transformPage(params.value))
  offset?: number = 1;

  @IsOptional()
  @Transform((params) => transformLimit(params.value))
  limit?: number = 5;

  @IsOptional()
  searchQuery?: string;

  @IsOptional()
  lat?: number;

  @IsOptional()
  lan?: number;

  @IsOptional()
  weekday?: number;

  @IsOptional()
  startHour?: string;

  @IsOptional()
  endHour?: string;
}
