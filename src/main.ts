import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Environments } from './shared/enums/environments.enum';
import { setupBullBoard } from './shared/infrastructure/http/bull-board.setup';
import { setupSwagger } from './shared/infrastructure/http/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environment = process.env.NODE_ENV;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  if (environment === Environments.DEVELOPMENT) {
    setupSwagger(app);
    setupBullBoard(app);
  }
  if (environment === Environments.PRODUCTION) {
    app.use(helmet());
    app.enableCors({});
  }
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
