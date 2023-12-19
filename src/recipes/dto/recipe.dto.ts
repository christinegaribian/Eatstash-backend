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

  @IsOptional()
  @IsString()
  readonly description: string;

  //   TODO: make this date
  @IsString()
  readonly datePublished: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly image: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly recipeYield: string[];

  @IsOptional()
  readonly prepTime: string;

  @IsOptional()
  readonly cookTime?: string;

  @IsOptional()
  readonly totalTime: string;

  @IsArray()
  @IsString({ each: true })
  readonly ingredients: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly recipeCategory: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly recipeCuisine: string[];

  @IsOptional()
  @IsUrl()
  readonly link?: string;

// TODO: this should be parsed and set in server
//   @IsOptional()
//   @IsString()
//   readonly sourceType: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly instructions: string[];

  @IsOptional()
  readonly aggregateRating?: AggregateRatingDto;

  @IsOptional()
  readonly author: AuthorDto;
}
