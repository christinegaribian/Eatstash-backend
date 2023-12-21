import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesController } from './recipes/recipes.controller';
import { MealPlansController } from './meal-plans/meal-plans.controller';
import { MealPlansService } from './meal-plans/meal-plans.service';
import { GroceryListsController } from './grocery-lists/grocery-lists.controller';
import { GroceryListsService } from './grocery-lists/grocery-lists.service';
import { DbController } from './db/db.controller';
import { CosmosDbService } from './db/cosmos-db.service';
import { RecipesService } from './recipes/recipes.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true, // Makes the ConfigModule available throughout the application.
    }),
    RecipesModule,
  ],
  controllers: [AppController, RecipesController, MealPlansController, GroceryListsController, DbController],
  providers: [AppService, CosmosDbService, RecipesService, MealPlansService, GroceryListsService],
  exports: [CosmosDbService],
})
export class AppModule {}
