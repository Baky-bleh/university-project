import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import next from 'next';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const dev = process.env.NODE_ENV !== 'production';
  const nextServer = next({ dev, dir: './next' });
  const handle = nextServer.getRequestHandler();

  await nextServer.prepare();

  app.use((req, res, next) => {
    if (req.path.startsWith('')) {
      return next();
    }

    return handle(req, res);
  });
  app.enableCors();
  await app.listen(3002);
}

bootstrap();