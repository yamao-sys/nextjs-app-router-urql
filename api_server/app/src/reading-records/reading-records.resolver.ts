import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReadingRecordsService } from './reading-records.service';
import { ReadingRecord } from './entities/reading-record.entity';
import { CreateReadingRecordInput } from './dto/create-reading-record.input';
import { UpdateReadingRecordInput } from './dto/update-reading-record.input';

@Resolver(() => ReadingRecord)
export class ReadingRecordsResolver {
  constructor(private readonly readingRecordsService: ReadingRecordsService) {}

  @Mutation(() => ReadingRecord)
  createReadingRecord(
    @Args('createReadingRecordInput') createReadingRecordInput: CreateReadingRecordInput,
  ) {
    return this.readingRecordsService.create(createReadingRecordInput);
  }

  @Query(() => [ReadingRecord], { name: 'readingRecords' })
  findAll() {
    console.log('fdkfjadfjda');
    return this.readingRecordsService.findAll();
  }

  @Query(() => ReadingRecord, { name: 'readingRecord' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.readingRecordsService.findOne(id);
  }

  @Mutation(() => ReadingRecord)
  updateReadingRecord(
    @Args('updateReadingRecordInput') updateReadingRecordInput: UpdateReadingRecordInput,
  ) {
    return this.readingRecordsService.update(updateReadingRecordInput.id, updateReadingRecordInput);
  }

  @Mutation(() => ReadingRecord)
  removeReadingRecord(@Args('id', { type: () => Int }) id: number) {
    return this.readingRecordsService.remove(id);
  }
}
