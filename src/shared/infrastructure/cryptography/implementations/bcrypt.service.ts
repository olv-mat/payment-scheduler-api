import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cryptography } from '../cryptography';

@Injectable()
export class BcryptService implements Cryptography {
  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
