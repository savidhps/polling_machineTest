import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePollDto } from './dto/create-poll.dto';
import { VoteDto } from './dto/vote.dto';
import { UserRequest } from '../common/interfaces/user-request.interface'; // ✅ Import custom request type

@Controller('poll')
@UseGuards(JwtAuthGuard)
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  createPoll(@Body() dto: CreatePollDto, @Req() req: UserRequest) {
    const userId = req.user.userId;
    return this.pollService.createPoll(dto, userId);
  }

  @Get()
  getPolls() {
    return this.pollService.getPolls();
  }

  @Get(':id')
  getPoll(@Param('id') id: string) {
    return this.pollService.getPollById(id);
  }

  @Post(':id/vote')
  vote(@Param('id') id: string, @Body() voteDto: VoteDto, @Req() req: UserRequest) {
    if (!voteDto || !voteDto.option) {
      throw new BadRequestException('Missing vote option');
    }

    const userId = req.user.userId;
    const role = req.user.role;

    return this.pollService.vote(id, voteDto.option, userId, role);
  }
}
