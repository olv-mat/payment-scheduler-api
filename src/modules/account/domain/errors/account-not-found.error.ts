import { DomainError } from 'src/shared/domain/errors/domain.error';

export class AccountNotFoundError extends DomainError {
  constructor() {
    super('Account not found');
  }
}
