// src/polls/polls.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('polls')
export class PollsController {
  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  adminOnly(@Request() req) {
    console.log('User:', req.user); // debugging line
    return { message: `Welcome ${req.user.email}, you're an admin.` };
  }
}
