import { Module } from '@nestjs/common';
import { ReadingRecordsService } from './reading-records.service';
import { ReadingRecordsResolver } from './reading-records.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReadingRecordsResolver, ReadingRecordsService, PrismaService],
})
export class ReadingRecordsModule {}
