import { Module } from '@nestjs/common';
import { SmarTender } from 'src/smartender/smartender.service';
import { CoctailController } from './coctail.controller';
import { CoctailService } from './coctail.service';

@Module({
  controllers: [CoctailController],
  providers: [CoctailService, SmarTender],
})
export class CoctailModule {}
