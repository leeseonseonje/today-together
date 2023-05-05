import { Module } from '@nestjs/common';
import { ChallengeApiService } from './service/challenge-api.service';
import { ChallengeController } from './controller/challenge.controller';
import {ChallengeModule} from 'lib/entity/domains/challenge/challenge.module';

@Module({
  imports: [ChallengeModule],
  controllers: [ChallengeController],
  providers: [ChallengeApiService]
})
export class ChallengeApiModule {}
