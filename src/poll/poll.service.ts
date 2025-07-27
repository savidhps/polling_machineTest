// src/poll/poll.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from './poll.schema';
import { Model, Types } from 'mongoose';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  constructor(@InjectModel(Poll.name) private pollModel: Model<PollDocument>) {}

  async createPoll(dto: CreatePollDto, userId: string): Promise<Poll> {
    const poll = new this.pollModel({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      votes: dto.options.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {}),
    });
    return poll.save();
  }

  async getPolls(): Promise<Poll[]> {
    return this.pollModel.find().populate('createdBy', 'name email');
  }

  async getPollById(id: string): Promise<Poll> {
    const poll = await this.pollModel.findById(id);
    if (!poll) throw new NotFoundException('Poll not found');
    return poll;
  }

  async vote(
  pollId: string,
  option: string,
  userId: string,
  role: string,
): Promise<Poll> {
  const poll = await this.pollModel.findById(pollId);
  if (!poll) throw new NotFoundException('Poll not found');

  const userObjectId = new Types.ObjectId(userId);

  if (!poll.isPublic && !poll.allowedUsers.includes(userObjectId)) {
    throw new ForbiddenException('You are not allowed to vote on this poll.');
  }

  if (poll.votedUsers.includes(userObjectId)) {
    throw new ForbiddenException('You have already voted.');
  }

  if (!poll.options.includes(option)) {
    throw new NotFoundException('Invalid option');
  }

  // ✅ FIXED: Use object property update instead of Map
  poll.votes[option] = (poll.votes[option] || 0) + 1;
  poll.votedUsers.push(userObjectId);
  return poll.save();
}
}
