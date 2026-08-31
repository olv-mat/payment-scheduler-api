import { IsUUID } from 'class-validator';
import { IdInput } from 'src/shared/domain/types/id-input.type';

export class IdDto implements IdInput {
  @IsUUID()
  public readonly id!: string;
}
