import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Credential } from '../credential';

@Injectable()
export class JwtServiceImplementation implements Credential {
  constructor(private readonly jwtService: JwtService) {}

  public sign<T extends object>(payload: T): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
