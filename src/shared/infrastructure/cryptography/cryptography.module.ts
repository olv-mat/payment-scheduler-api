import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptographyComparer } from 'src/shared/domain/cryptography/comparer';
import { CryptographySigner } from 'src/shared/domain/cryptography/signer';
import { CryptographyHasher } from '../../domain/cryptography/hasher';
import { BcryptCryptographyComparer } from './implementations/bcrypt-comparer';
import { BcryptCryptographyHasher } from './implementations/bcrypt-hasher';
import { JwtCryptographySigner } from './implementations/jwt-signer';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          audience: configService.getOrThrow<string>('JWT_AUDIENCE'),
          issuer: configService.getOrThrow<string>('JWT_ISSUER'),
          expiresIn: parseInt(configService.getOrThrow<string>('JWT_TTL')),
        },
      }),
    }),
    PassportModule,
  ],
  providers: [
    { provide: CryptographyComparer, useClass: BcryptCryptographyComparer },
    { provide: CryptographyHasher, useClass: BcryptCryptographyHasher },
    { provide: CryptographySigner, useClass: JwtCryptographySigner },
  ],
  exports: [CryptographyComparer, CryptographyHasher, CryptographySigner],
})
export class CryptographyModule {}
