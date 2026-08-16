import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Comparer } from 'src/shared/domain/cryptography/comparer';
import { Signer } from 'src/shared/domain/cryptography/signer';
import { Hasher } from '../../domain/cryptography/hasher';
import { BcryptComparer } from './implementations/bcrypt-comparer';
import { BcryptHasher } from './implementations/bcrypt-hasher';
import { JwtSigner } from './implementations/jwt-signer';

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
    { provide: Comparer, useClass: BcryptComparer },
    { provide: Hasher, useClass: BcryptHasher },
    { provide: Signer, useClass: JwtSigner },
  ],
  exports: [Comparer, Hasher, Signer],
})
export class CryptographyModule {}
