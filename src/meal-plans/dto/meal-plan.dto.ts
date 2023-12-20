import { IsArray, IsDateString, IsString, IsOptional } from 'class-validator';

export class MealPlanDto {
    @IsOptional()
    @IsDateString()
    readonly week: Date; // Representing the start of the week

    @IsArray()
    @IsString({ each: true })
    readonly recipeIds: string[]; // Array of recipe IDs
}