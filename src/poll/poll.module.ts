// src/poll/poll.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Poll, PollSchema } from './poll.schema';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Poll.name, schema: PollSchema }]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [PollController],
  providers: [PollService, JwtStrategy],
})
export class PollModule {}
