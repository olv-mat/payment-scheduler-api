import { NotFoundError } from 'src/shared/domain/errors/not-found.error';

export class ScheduleNotFoundError extends NotFoundError {
  constructor() {
    super('Schedule not found');
  }
}
