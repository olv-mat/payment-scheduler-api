import { NotFoundError } from 'src/shared/domain/errors/not-found.error';

export class AccountNotFoundError extends NotFoundError {
  constructor() {
    super('Account not found');
  }
}
