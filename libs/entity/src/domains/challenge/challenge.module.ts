import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Challenge} from 'lib/entity/domains/challenge/challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
})
export class ChallengeModule {}
