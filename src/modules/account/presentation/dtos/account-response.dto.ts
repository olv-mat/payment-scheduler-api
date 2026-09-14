import { AccountEntity } from '../../domain/entities/account.entity';

type AccountResponseProperties = {
  id: string;
  number: number;
  balance: number;
};

export class AccountResponseDto {
  public readonly id: string;
  public readonly number: number;
  public readonly balance: number;

  private constructor(properties: AccountResponseProperties) {
    this.id = properties.id;
    this.number = properties.number;
    this.balance = properties.balance;
  }

  public static fromEntity(entity: AccountEntity): AccountResponseDto {
    return new AccountResponseDto({
      id: entity.id,
      number: entity.number,
      balance: entity.balance,
    });
  }
}
