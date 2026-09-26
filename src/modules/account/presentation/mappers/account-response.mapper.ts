import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountResponseDto } from '../dtos/account-response.dto';

export class AccountResponseMapper {
  public static fromEntity(accountEntity: AccountEntity): AccountResponseDto {
    return new AccountResponseDto({
      id: accountEntity.id,
      balance: accountEntity.balance,
    });
  }

  public static fromEntities(
    accountEntities: AccountEntity[],
  ): AccountResponseDto[] {
    return accountEntities.map((accountEntity) =>
      AccountResponseMapper.fromEntity(accountEntity),
    );
  }
}
