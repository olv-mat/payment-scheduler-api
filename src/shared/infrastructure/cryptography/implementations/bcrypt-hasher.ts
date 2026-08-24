import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CryptographyHasher } from '../../../domain/cryptography/hasher';

@Injectable()
export class BcryptCryptographyHasher implements CryptographyHasher {
  public async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
  }
}
