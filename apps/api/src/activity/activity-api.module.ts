import {Module} from '@nestjs/common';
import {ActivityModule} from 'lib/entity/domains/activity/activity.module';
import {ActivityController} from './controller/activity.controller';
import {RecommendActivityInfraModule} from 'lib/infra/recommend-activity/recommend-activity-infra.module';
import {TranslatorInfraModule} from 'lib/infra/translator/translator-infra.module';
import {ActivityApiService} from './service/activity-api.service';

@Module({
  imports: [ActivityModule, RecommendActivityInfraModule, TranslatorInfraModule],
  controllers: [ActivityController],
  providers: [
    ActivityApiService,
  ],
})
export class ActivityApiModule {
}
