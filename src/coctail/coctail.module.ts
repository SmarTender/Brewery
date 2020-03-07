import { Module } from '@nestjs/common';
import { CoctailController } from './coctail.controller';
import { CoctailService } from './coctail.service';

@Module({
  controllers: [CoctailController],
  providers: [CoctailService]
})
export class CoctailModule {}
