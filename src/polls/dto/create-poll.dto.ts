// src/polls/dto/create-poll.dto.ts
export class CreatePollDto {
  title: string;
  description?: string;
  isPublic: boolean;
  expiresAt: Date;
  options: string[];
}
