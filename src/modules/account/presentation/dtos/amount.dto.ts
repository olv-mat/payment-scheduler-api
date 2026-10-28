import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';
import { AmountInput } from '../../domain/types/amount-input.type';

export class AmountDto implements AmountInput {
  @IsNotEmpty()
  @IsNumber()
  @NotEquals(0)
  public readonly amount!: number;
}
