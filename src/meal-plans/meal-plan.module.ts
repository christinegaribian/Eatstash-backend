import { Module } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { MealPlansController } from './meal-plans.controller';
import { CosmosDbService } from '../db/cosmos-db.service';

@Module({
  controllers: [MealPlansController],
  providers: [MealPlansService, CosmosDbService],
})
export class MealPlanModule {}
