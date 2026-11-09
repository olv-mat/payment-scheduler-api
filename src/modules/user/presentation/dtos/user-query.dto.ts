import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserQueryInput } from '../../domain/types/user-query-input.type';

export class UserQueryDto implements UserQueryInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public readonly name?: string;
}
