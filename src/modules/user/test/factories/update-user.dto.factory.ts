import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';

export const makeUpdateUserDto = (
  override?: Partial<Record<keyof UpdateUserDto, unknown>>,
): UpdateUserDto => {
  return Object.assign(new UpdateUserDto(), { ...override });
};
