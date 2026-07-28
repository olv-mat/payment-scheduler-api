import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Payment Scheduler API')
      .setDescription(
        'A NestJS-based API that allows users to schedule future payments, leveraging BullMQ and Redis for background processing, secured with JWT authentication.',
      )
      .addBearerAuth()
      .build(),
  );
  const theme = new SwaggerTheme();
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
