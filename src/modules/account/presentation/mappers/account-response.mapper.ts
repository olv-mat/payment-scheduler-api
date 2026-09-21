import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountResponseDto } from '../dtos/account-response.dto';

export class AccountResponseMapper {
  public static fromEntity(entity: AccountEntity): AccountResponseDto {
    return new AccountResponseDto({
      id: entity.id,
      number: entity.number,
      balance: entity.balance,
    });
  }

  public static fromEntities(entities: AccountEntity[]): AccountResponseDto[] {
    return entities.map((entity) => AccountResponseMapper.fromEntity(entity));
  }
}
