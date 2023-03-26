import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/ActivityModule";
import {dbConfig} from "./db/config";

@Module({
  imports: [ActivityModule, dbConfig],
})
export class AppModule {
}
