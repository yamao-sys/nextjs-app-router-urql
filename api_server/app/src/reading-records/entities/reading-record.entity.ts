import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ReadingRecord {
  @Field(() => Int, { description: '読書記録のID' })
  id: number;

  @Field(() => String, { description: '読んだ本のtitle' })
  title: string;

  @Field(() => String, { nullable: true, description: '読んだ本の学んだこと' })
  learnedContent?: string;

  @Field(() => String, { nullable: true, description: '読んだ本の感想' })
  impression?: string;
}
