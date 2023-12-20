// append-recipes.dto.ts
import { IsArray, IsString } from 'class-validator';

export class AppendRecipesDto {
    @IsArray()
    @IsString({ each: true })
    readonly recipeIds: string[];
}
