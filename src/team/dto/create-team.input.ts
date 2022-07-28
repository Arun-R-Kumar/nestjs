import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field()
  name: string;

  @Field()
  icon: string;
}
