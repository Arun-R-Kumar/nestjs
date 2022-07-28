import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { urlToHttpOptions } from 'url';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  create(createProfileInput: CreateProfileInput) {
    // return this.prisma.profile.create(
    // {
    //   data: {
    //     age: createProfileInput.age,
    //     name: createProfileInput.name,
    //     qualification: createProfileInput.qualification,
    //     team: { connect: { id: createProfileInput.teamId } },
    //   },
    // },
    const data: Prisma.ProfileCreateInput = {
      age: createProfileInput.age,
      name: createProfileInput.name,
      qualification: createProfileInput.qualification,
      team: { connect: { id: createProfileInput.teamId } },
    };
    return this.prisma.profile.create({ data });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: string) {
    const profile = this.prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`profile not found`);
    }
    return profile;
  }

  update(id: string, updateProfileInput: UpdateProfileInput) {
    const data: Prisma.ProfileUpdateInput = {
      age: updateProfileInput.age,
      name: updateProfileInput.name,
      qualification: updateProfileInput.qualification,
      team: { update: { id: updateProfileInput.teamId } },
    };
    return this.prisma.profile.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
