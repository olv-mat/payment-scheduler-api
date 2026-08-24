import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CryptographyComparer } from 'src/shared/domain/cryptography/comparer';

@Injectable()
export class BcryptCryptographyComparer implements CryptographyComparer {
  public compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
