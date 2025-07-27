// src/poll/poll.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PollDocument = Poll & Document;

@Schema({ timestamps: true })
export class Poll {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ type: Map, of: Number, default: {} })
  votes: Map<string, number>;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop()
  expiresAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  allowedUsers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  votedUsers: Types.ObjectId[];
}

export const PollSchema = SchemaFactory.createForClass(Poll);
