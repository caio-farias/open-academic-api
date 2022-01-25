import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import CommonModule from './modules/common/index.module';
import FeaturesModule from './modules/features/index.module';

@Module({
  imports: [FeaturesModule, CommonModule],
  controllers: [AppController],
  providers: [],
})
export default class AppModule {}
