import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserTypeOrmEntity } from './modules/user/infrastructure/persistence/user.typeorm.entity';
import { UserModule } from './modules/user/user.module';
import { CryptographyModule } from './shared/infrastructure/cryptography/cryptography.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        username: configService.getOrThrow<string>('DATABASE_USERNAME'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        entities: [UserTypeOrmEntity],
        autoLoadEntities: false,
        synchronize: true,
      }),
    }),
    UserModule,
    CryptographyModule,
    AuthenticationModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
