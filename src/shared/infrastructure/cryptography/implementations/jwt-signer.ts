import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Signer } from '../../../domain/cryptography/signer';

@Injectable()
export class JwtSigner implements Signer {
  constructor(private readonly service: JwtService) {}

  public sign<T extends object>(payload: T): Promise<string> {
    return this.service.signAsync(payload);
  }
}
