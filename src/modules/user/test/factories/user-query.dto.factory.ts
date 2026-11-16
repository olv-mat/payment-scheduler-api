import { UserQueryDto } from '../../presentation/dtos/user-query.dto';

export const makeUserQueryDto = (
  override?: Partial<Record<keyof UserQueryDto, unknown>>,
): UserQueryDto => {
  return Object.assign(new UserQueryDto(), { ...override });
};
