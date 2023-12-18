import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesController } from './recipes/recipes.controller';
import { MealPlansController } from './meal-plans/meal-plans.controller';
import { GroceryListsController } from './grocery-lists/grocery-lists.controller';
import { DbController } from './db/db.controller';
import { CosmosDbService } from './db/cosmos-db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true, // Makes the ConfigModule available throughout the application.
    }),
  ],
  controllers: [AppController, RecipesController, MealPlansController, GroceryListsController, DbController],
  providers: [AppService, CosmosDbService],
  exports: [CosmosDbService],
})
export class AppModule {}
