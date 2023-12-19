import { IsOptional, IsString, IsArray, IsDateString, IsISO8601, IsUrl } from 'class-validator';

class AggregateRatingDto {
  @IsString()
  readonly ratingValue: string;

  @IsString()
  readonly ratingCount: string;
}

class AuthorDto {
  @IsString()
  readonly name: string;

  @IsUrl()
  readonly url: string;
}

// TODO: Add associated video info for food blogs

export class RecipeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsDateString()
  readonly datePublished: Date;

  @IsArray()
  @IsUrl({}, { each: true })
  readonly image: string[];

  @IsArray()
  @IsString({ each: true })
  readonly recipeYield: string[];

  @IsISO8601()
  readonly prepTime: string;

  @IsOptional()
  @IsISO8601()
  readonly cookTime?: string;

  @IsISO8601()
  readonly totalTime: string;

  @IsArray()
  @IsString({ each: true })
  readonly ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  readonly recipeCategory: string[];

  @IsArray()
  @IsString({ each: true })
  readonly recipeCuisine: string[];

  @IsOptional()
  @IsUrl()
  readonly link?: string;

  @IsString()
  readonly sourceType: string;

  @IsArray()
  @IsString({ each: true })
  readonly instructions: string[];

  @IsOptional()
  readonly aggregateRating?: AggregateRatingDto;

  readonly author: AuthorDto;
}
