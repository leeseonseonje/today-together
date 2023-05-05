import {Global, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {RecommendActivityApi} from 'lib/infra/recommend-activity/recommend-activity.api';

@Global()
@Module({
  imports: [HttpModule],
  providers: [RecommendActivityApi],
  exports: [RecommendActivityApi],
})
export class RecommendActivityInfraModule {
}
