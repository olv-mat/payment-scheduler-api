import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Comparer } from 'src/shared/domain/cryptography/comparer';

@Injectable()
export class BcryptComparer implements Comparer {
  public compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
