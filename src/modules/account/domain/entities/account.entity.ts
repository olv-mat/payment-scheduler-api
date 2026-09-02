export class AccountEntity {
  constructor(
    public readonly id: string,
    public readonly number: number,
    public readonly balance: number,
  ) {}
}
