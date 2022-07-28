import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './profile.model';
import { Team } from 'src/team/team.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Profile)
  createProfile(@Args('data') createProfileInput: CreateProfileInput) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile])
  profiles() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(id, updateProfileInput);
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => ID }) id: string) {
    return this.profileService.remove(id);
  }

  @ResolveField(() => Team)
  async team(@Parent() profile: Profile) {
    return this.prisma.profile.findUnique({ where: { id: profile.id } }).team();
  }
}
