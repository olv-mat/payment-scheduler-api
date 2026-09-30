import { UnprocessableEntityError } from 'src/shared/domain/errors/unprocessable-entity.error';

export class SameAccountScheduleError extends UnprocessableEntityError {
  constructor() {
    super('Payer and receiver must be different accounts');
  }
}
