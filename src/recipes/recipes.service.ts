import { Injectable, NotFoundException } from '@nestjs/common';
import { CosmosDbService } from '../db/cosmos-db.service';
import { RecipeDto } from './dto/recipe.dto';
import { RateRecipeDto } from './dto/rate-recipe.dto';

const RECIPE_CONTAINER_NAME = 'Recipes';

@Injectable()
export class RecipesService {
    constructor(private readonly cosmosDbService: CosmosDbService) {}

    async create(recipeDto: RecipeDto): Promise<any> {
        // Assuming 'recipes' is the container name
        console.log("in the recipe service. dto:    " + recipeDto);
        return this.cosmosDbService.createItem(RECIPE_CONTAINER_NAME, recipeDto);
    }

    async findOne(id: string): Promise<any> {
        return this.cosmosDbService.getItemById(RECIPE_CONTAINER_NAME, id);
    }

    async findAll(): Promise<any[]> {
        return this.cosmosDbService.getAllItems(RECIPE_CONTAINER_NAME);
    }

    async update(id: string, recipeDto: RecipeDto): Promise<any> {
        // Ensure the id is included in the update data
        const updatedRecipe = { id, ...recipeDto };
        return this.cosmosDbService.updateItem(RECIPE_CONTAINER_NAME, id, updatedRecipe);
    }

    async rateRecipe(id: string, rateRecipeDto: RateRecipeDto): Promise<any> {
        // Retrieve the recipe by ID
        const recipe = await this.cosmosDbService.getItemById(RECIPE_CONTAINER_NAME, id);
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }
    
        // Update the rating
        recipe.rating = rateRecipeDto.rating;
    
        // Save the updated recipe
        await this.cosmosDbService.updateItem(RECIPE_CONTAINER_NAME, id, recipe);
    
        return recipe;
    }

    async delete(id: string): Promise<void> {
        return this.cosmosDbService.deleteItem(RECIPE_CONTAINER_NAME, id);
    }
}
