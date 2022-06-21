import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets('../build/', {
    prefix: ''
  });

  // app.useStaticAssets('../Convert', {
  //   prefix: '/download'
  // });

  app.enableCors();
  
  await app.listen(4000);
}
bootstrap();
