import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import { PollsModule } from './polls/polls.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // Add your other modules here, like AuthModule, PollModule, etc.
    AuthModule,
    PollModule,
    // PollsModule,

  ],
  controllers: [AppController], // ✅ Correct place
})
export class AppModule {}
