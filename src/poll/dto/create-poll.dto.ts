// src/poll/dto/create-poll.dto.ts
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePollDto {
  @IsString()
  title: string;

  @IsArray()
  options: string[];

  @IsBoolean()
  isPublic: boolean;

  @IsOptional()
  @IsString({ each: true })
  allowedUsers?: string[];

  @IsOptional()
  expiresAt?: Date;
}
