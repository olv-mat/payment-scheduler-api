import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/modules/authentication/domain/types/access-token-payload.type';

type AuthenticatedRequest = Request & { user: AccessTokenPayload };

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AccessTokenPayload => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
