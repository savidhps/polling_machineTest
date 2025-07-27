import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PollsService],
  controllers: [PollsController]
  ,imports: [AuthModule],
})
export class PollsModule {}
