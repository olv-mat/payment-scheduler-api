import { PaginationQueryInput } from 'src/shared/domain/types/pagination-query-input.type';

export type UserQueryInput = PaginationQueryInput & {
  name?: string;
};
