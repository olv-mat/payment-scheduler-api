import { DomainError } from 'src/shared/domain/errors/domain.error';

export class InsufficientAccountBalanceError extends DomainError {
  constructor() {
    super('Insufficient account balance');
  }
}
