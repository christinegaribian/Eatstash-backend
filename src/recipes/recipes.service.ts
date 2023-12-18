import { Injectable } from '@nestjs/common';
import { CosmosDbService } from '../db/cosmos-db.service';
import { RecipeDto } from './dto/recipe.dto'; // Assuming you have a DTO for recipes

@Injectable()
export class RecipesService {
    constructor(private readonly cosmosDbService: CosmosDbService) {}

    async create(recipeDto: RecipeDto): Promise<any> {
        // Assuming 'recipes' is the container name
        return this.cosmosDbService.createItem('recipes', recipeDto);
    }

    async findOne(id: string): Promise<any> {
        return this.cosmosDbService.getItemById('recipes', id);
    }

    async findAll(): Promise<any[]> {
        return this.cosmosDbService.getAllItems('recipes');
    }

    async update(id: string, recipeDto: RecipeDto): Promise<any> {
        // Ensure the id is included in the update data
        const updatedRecipe = { id, ...recipeDto };
        return this.cosmosDbService.updateItem('recipes', id, updatedRecipe);
    }

    async delete(id: string): Promise<void> {
        return this.cosmosDbService.deleteItem('recipes', id);
    }
}
