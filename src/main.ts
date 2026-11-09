import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environments } from './shared/enums/environments.enum';
import { setupBullBoard } from './shared/infrastructure/http/bull-board.setup';
import { setupSwagger } from './shared/infrastructure/http/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  if (process.env.NODE_ENV === Environments.DEVELOPMENT) {
    setupSwagger(app);
    setupBullBoard(app);
  }
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
