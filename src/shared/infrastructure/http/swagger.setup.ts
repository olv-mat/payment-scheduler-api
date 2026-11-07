import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export function setupSwagger(app: INestApplication): void {
  const builder = new DocumentBuilder()
    .setTitle('Payment Scheduler API')
    .setDescription(
      'A NestJS-based API that allows users to schedule future payments, leveraging BullMQ and Redis for background processing, secured with JWT authentication.',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  const theme = new SwaggerTheme();
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });
}
