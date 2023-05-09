import {Module} from '@nestjs/common';
import {Activity} from 'lib/entity/domains/activity/activity.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
})
export class ActivityModule {
}
