import { IdDto } from 'src/shared/presentation/dtos/id.dto';

export const makeIdDto = (override?: Record<keyof IdDto, unknown>): IdDto => {
  return Object.assign(new IdDto(), {
    id: '8ca0387e-9dc5-47e5-8bac-82463d9e612a',
    ...override,
  });
};
