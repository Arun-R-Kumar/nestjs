import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './team.model';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Team)
  createTeam(@Args('data') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @Query(() => [Team])
  async teams() {
    return await this.teamService.findAll();
  }

  @Query(() => Team)
  team(@Args('id', { type: () => ID }) id: string) {
    return this.teamService.findOne(id);
  }

  @Mutation(() => Team)
  updateTeam(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') updateTeamInput: UpdateTeamInput,
  ) {
    return this.teamService.update(id, updateTeamInput);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id', { type: () => ID }) id: string) {
    return this.teamService.remove(id);
  }
}
