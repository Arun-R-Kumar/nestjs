import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  qualification: string;

  @Field()
  teamId: string;
}
