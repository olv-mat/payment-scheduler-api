import { ForbiddenError } from 'src/shared/domain/errors/forbidden.error';

export class NotSchedulePayerError extends ForbiddenError {
  constructor() {
    super('Only the schedule payer can perform this action');
  }
}
