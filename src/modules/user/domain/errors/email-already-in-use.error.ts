import { ConflictError } from 'src/shared/domain/errors/conflict.error';

export class EmailAlreadyInUseError extends ConflictError {
  constructor() {
    super('Email already in use');
  }
}
