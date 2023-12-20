import { IsArray, IsDateString, IsString } from 'class-validator';

export class MealPlanDto {
    @IsDateString()
    readonly week: Date; // Representing the start of the week

    @IsArray()
    @IsString({ each: true })
    readonly recipeIds: string[]; // Array of recipe IDs
}