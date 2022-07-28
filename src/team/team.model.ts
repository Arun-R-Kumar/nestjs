import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
