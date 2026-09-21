type AccountResponseProperties = {
  id: string;
  number: number;
  balance: number;
};

export class AccountResponseDto {
  public readonly id: string;
  public readonly number: number;
  public readonly balance: number;

  constructor(properties: AccountResponseProperties) {
    this.id = properties.id;
    this.number = properties.number;
    this.balance = properties.balance;
  }
}
