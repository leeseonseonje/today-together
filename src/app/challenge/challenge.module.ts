import { Module } from '@nestjs/common';
import { ChallengeService } from './service/challenge.service';
import { ChallengeController } from './controller/challenge.controller';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
