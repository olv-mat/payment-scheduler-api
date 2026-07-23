import { Global, Module } from '@nestjs/common';
import { Cryptography } from './cryptography';
import { BcryptService } from './implementations/bcrypt.service';

@Global()
@Module({
  providers: [{ provide: Cryptography, useClass: BcryptService }],
  exports: [Cryptography],
})
export class CryptographyModule {}
