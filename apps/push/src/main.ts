import { NestFactory } from '@nestjs/core';
import { PushModule } from './push.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PushModule);

  const config = new DocumentBuilder()
    .setTitle('Today Together API')
    .setDescription('Today Together API Spec')
    .setVersion('1.0')
    .addTag('Today Together')
    .build();

  console.log(!process.env.NODE_ENV ? 'development' : process.env.NODE_ENV);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
