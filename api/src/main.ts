import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const smarTender = app.get(SmarTender);

  // smarTender.setup({}, {});
  // await smarTender.init();
  await app.listen(3000);
}
bootstrap();
