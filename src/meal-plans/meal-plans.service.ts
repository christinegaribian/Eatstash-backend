import { Injectable } from '@nestjs/common';
import { CosmosDbService } from '../db/cosmos-db.service';
import { MealPlanDto } from './dto/meal-plan.dto';

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

    async findAll(): Promise<any[]> {
        return this.cosmosDbService.getAllItems(MEAL_PLAN_CONTAINER_NAME);
    }

    async update(id: string, mealPlanDto: MealPlanDto): Promise<any> {
        const updatedMealPlan = { id, ...mealPlanDto };
        return this.cosmosDbService.updateItem(MEAL_PLAN_CONTAINER_NAME, id, updatedMealPlan);
    }

    async delete(id: string): Promise<void> {
        return this.cosmosDbService.deleteItem(MEAL_PLAN_CONTAINER_NAME, id);
    }
}
