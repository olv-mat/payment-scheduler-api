import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/presentation/dtos/pagination-query.dto';
import { UserQueryInput } from '../../domain/types/user-query-input.type';

export class UserQueryDto extends PaginationQueryDto implements UserQueryInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly name?: string;
}
