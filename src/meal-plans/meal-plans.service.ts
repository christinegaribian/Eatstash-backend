import { Injectable, NotFoundException } from '@nestjs/common';
import { CosmosDbService } from '../db/cosmos-db.service';
import { MealPlanDto } from './dto/meal-plan.dto';
import { AppendRecipesDto } from './dto/append-recipes.dto';

const MEAL_PLAN_CONTAINER_NAME = 'MealPlans';

@Injectable()
export class MealPlansService {
    constructor(private readonly cosmosDbService: CosmosDbService) {}

    async create(mealPlanDto: MealPlanDto): Promise<any> {
        return this.cosmosDbService.createItem(MEAL_PLAN_CONTAINER_NAME, mealPlanDto);
    }

    async findOne(id: string): Promise<any> {
        return this.cosmosDbService.getItemById(MEAL_PLAN_CONTAINER_NAME, id);
    }

    async findByWeek(week: string): Promise<MealPlanDto | {}> {
        // Fetch the meal plan for the week
        const query = {
            query: `SELECT * FROM c WHERE c.week = @week`,
            parameters: [{name: '@week',value: week}]
        };
        const { resources: mealPlans } = await this.cosmosDbService.queryItems('MealPlans', query);

        if (mealPlans.length === 0) {
            return {};
        }

        // Fetch each recipe in the meal plan
        const mealPlan = mealPlans[0];
        const recipeDetails = await Promise.all(
            mealPlan.recipeIds.map(async (recipeId) => {
                const queryForRecipe = {
                    query: `SELECT * FROM c WHERE c.id = @id`,
                    parameters: [{ name: '@id', value: recipeId }]
                };

                const recipeResponse = await this.cosmosDbService.queryItems('Recipes', queryForRecipe);
                return recipeResponse.resources[0]; // Assuming each ID corresponds to a unique recipe
            })
        );

        return {
            ...mealPlan,
            recipes: recipeDetails // Include full recipe details in the response
        };
    }

    async findAll(): Promise<any[]> {
        return this.cosmosDbService.getAllItems(MEAL_PLAN_CONTAINER_NAME);
    }

    async update(id: string, mealPlanDto: MealPlanDto): Promise<any> {
        const updatedMealPlan = { id, ...mealPlanDto };
        return this.cosmosDbService.updateItem(MEAL_PLAN_CONTAINER_NAME, id, updatedMealPlan);
    }

    async appendRecipes(id: string, appendRecipesDto: AppendRecipesDto): Promise<any> {
        const mealPlan = await this.cosmosDbService.getItemById(MEAL_PLAN_CONTAINER_NAME, id);
        if (!mealPlan) {
            throw new NotFoundException(`Meal plan with ID ${id} not found`);
        }

        // Append new recipes and avoid duplicates
        mealPlan.recipeIds = [...new Set([...mealPlan.recipeIds, ...appendRecipesDto.recipeIds])];

        return this.cosmosDbService.updateItem(MEAL_PLAN_CONTAINER_NAME, id, mealPlan);
    }

    async delete(id: string): Promise<void> {
        return this.cosmosDbService.deleteItem(MEAL_PLAN_CONTAINER_NAME, id);
    }
}
