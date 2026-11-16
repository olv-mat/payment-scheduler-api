import { CreateUserDto } from '../../presentation/dtos/create-user.dto';

export const makeCreateUserDto = (
  override?: Partial<Record<keyof CreateUserDto, unknown>>,
): CreateUserDto => {
  return Object.assign(new CreateUserDto(), {
    name: 'John Doe',
    email: 'john.doe@test.com',
    password: '@JohnDoe123',
    ...override,
  });
};
