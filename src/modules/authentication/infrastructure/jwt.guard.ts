import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenPayload } from '../domain/contracts/access-token-payload';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  public handleRequest<T = AccessTokenPayload>(error: any, user: T | false): T {
    if (user) return user;
    throw new UnauthorizedException('Invalid, expired, or missing token');
  }
}
