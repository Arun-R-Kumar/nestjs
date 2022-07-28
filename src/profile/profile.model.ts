import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Team } from 'src/team/team.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  qualification: string;

  @Field(() => Team)
  team: Team;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
