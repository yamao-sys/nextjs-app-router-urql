import { Test, TestingModule } from '@nestjs/testing';
import { ReadingRecordsResolver } from './reading-records.resolver';
import { ReadingRecordsService } from './reading-records.service';

describe('ReadingRecordsResolver', () => {
  let resolver: ReadingRecordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingRecordsResolver, ReadingRecordsService],
    }).compile();

    resolver = module.get<ReadingRecordsResolver>(ReadingRecordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
