import { CreateReadingRecordInput } from './create-reading-record.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReadingRecordInput extends PartialType(CreateReadingRecordInput) {
  @Field(() => Int)
  id: number;
}
