import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class RateRecipeDto {
    @IsInt()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    readonly rating: number;
}
