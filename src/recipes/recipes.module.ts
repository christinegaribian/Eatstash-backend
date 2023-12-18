// src/recipes/recipes.module.ts
import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { CosmosDbService } from '../db/cosmos-db.service';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, CosmosDbService],
})
export class RecipesModule {}
