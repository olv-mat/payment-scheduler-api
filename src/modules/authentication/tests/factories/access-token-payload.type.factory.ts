import { AccessTokenPayload } from '../../domain/types/access-token-payload.type';

export const makeAccessTokenPayload = (
  override?: Partial<AccessTokenPayload>,
): AccessTokenPayload => {
  return {
    sub: '8ca0387e-9dc5-47e5-8bac-82463d9e612a',
    name: 'John Doe',
    email: 'john.doe@test.com',
    ...override,
  };
};
