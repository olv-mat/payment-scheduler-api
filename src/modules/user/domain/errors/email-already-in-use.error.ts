import { DomainError } from 'src/shared/domain/errors/domain.error';

export class EmailAlreadyInUseError extends DomainError {
  constructor() {
    super('Email already in use');
  }
}
