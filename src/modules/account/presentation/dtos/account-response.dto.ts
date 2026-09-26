type AccountResponseProperties = {
  id: string;
  balance: number;
};

export class AccountResponseDto {
  public readonly id: string;
  public readonly balance: number;

  constructor(properties: AccountResponseProperties) {
    this.id = properties.id;
    this.balance = properties.balance;
  }
}
