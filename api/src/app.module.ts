import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoctailModule } from './coctail/coctail.module';
import { SmarTender } from './smartender/smartender.service';

@Module({
  imports: [CoctailModule],
  controllers: [AppController],
  providers: [AppService, SmarTender],
})
export class AppModule {}
