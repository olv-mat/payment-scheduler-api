import { UnprocessableEntityError } from 'src/shared/domain/errors/unprocessable-entity.error';

export class InsufficientAccountBalanceError extends UnprocessableEntityError {
  constructor() {
    super('Insufficient account balance');
  }
}
