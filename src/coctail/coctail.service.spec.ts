import { Test, TestingModule } from '@nestjs/testing';
import { CoctailService } from './coctail.service';

describe('CoctailService', () => {
  let service: CoctailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoctailService],
    }).compile();

    service = module.get<CoctailService>(CoctailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
