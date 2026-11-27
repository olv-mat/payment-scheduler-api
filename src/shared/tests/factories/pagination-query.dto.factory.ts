import { PaginationQueryDto } from 'src/shared/presentation/dtos/pagination-query.dto';

export const makePaginationQueryDto = (
  override?: Partial<Record<keyof PaginationQueryDto, unknown>>,
): PaginationQueryDto => {
  return Object.assign(new PaginationQueryDto(), {
    ...override,
  });
};
