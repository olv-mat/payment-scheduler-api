import { IsNotEmpty, IsPositive } from 'class-validator';
import { ValueInput } from '../../domain/types/value-input.type';

export class ValueDto implements ValueInput {
  @IsNotEmpty()
  @IsPositive()
  public readonly value!: number;
}
