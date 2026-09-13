import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';
import { ValueInput } from '../../domain/types/value-input.type';

export class ValueDto implements ValueInput {
  @IsNotEmpty()
  @IsNumber()
  @NotEquals(0)
  public readonly value!: number;
}
