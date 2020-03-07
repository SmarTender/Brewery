import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoctailModule } from './coctail/coctail.module';

@Module({
  imports: [CoctailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
