import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Activity} from 'lib/entity/domains/activity/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
})
export class ActivityModule {
}
