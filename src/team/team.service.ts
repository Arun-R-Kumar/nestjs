import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTeamInput: CreateTeamInput) {
    return this.prisma.team.create({
      data: { icon: createTeamInput.icon, name: createTeamInput.name },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  findOne(id: string) {
    const team = this.prisma.team.findUnique({ where: { id } });
    if (!team) {
      throw new NotFoundException(`team was not found`);
    }
  }

  update(id: string, updateTeamInput: UpdateTeamInput) {
    return this.prisma.team.update({
      where: { id },
      data: { icon: updateTeamInput.icon, name: updateTeamInput.name },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.team.delete({ where: { id } });
  }
}
