import { Module } from '@nestjs/common';
import {Challenge} from 'lib/entity/domains/challenge/challenge.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
})
export class ChallengeModule {}
