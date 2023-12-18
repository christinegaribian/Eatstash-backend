import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesController } from './recipes/recipes.controller';
import { MealPlansController } from './meal-plans/meal-plans.controller';
import { GroceryListsController } from './grocery-lists/grocery-lists.controller';
import { DbController } from './db/db.controller';

@Module({
  imports: [],
  controllers: [AppController, RecipesController, MealPlansController, GroceryListsController, DbController],
  providers: [AppService],
})
export class AppModule {}
