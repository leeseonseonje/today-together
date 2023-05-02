import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Today Together API')
    .setDescription('Today Together API Spec')
    .setVersion('1.0')
    .addTag('Today Together')
    .build();

  const configService = app.get(ConfigService);
  console.log(process.env.NODE_ENV);
  const host = configService.get<number>('DB_TYPE');
  console.log(host);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
