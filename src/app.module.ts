import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { AccountTypeOrmEntity } from './modules/account/infrastructure/persistence/account.typeorm.entity';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserTypeOrmEntity } from './modules/user/infrastructure/persistence/user.typeorm.entity';
import { UserModule } from './modules/user/user.module';
import { CryptographyModule } from './shared/infrastructure/cryptography/cryptography.module';
import { GlobalExceptionFilter } from './shared/presentation/filters/global-exception.filter';

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
        entities: [UserTypeOrmEntity, AccountTypeOrmEntity],
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
