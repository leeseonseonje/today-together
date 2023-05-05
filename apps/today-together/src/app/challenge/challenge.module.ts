import { Module } from '@nestjs/common';
import { ChallengeService } from './service/challenge.service';
import { ChallengeController } from './controller/challenge.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Challenge} from './challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
