import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReadingRecordInput {
  @Field(() => String, { description: '読んだ本のtitle' })
  title: string;

  @Field(() => String, { nullable: true, description: '読んだ本の学んだこと' })
  learnedContent?: string;

  @Field(() => String, { nullable: true, description: '読んだ本の感想' })
  impression?: string;
}
