import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengeService } from '../service/challenge.service';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

}
