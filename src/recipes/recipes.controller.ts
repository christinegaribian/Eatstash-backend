import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto'; // Assuming you have a DTO for recipes

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    async create(@Body() recipeDto: RecipeDto) {
        try {
            const newRecipe = await this.recipesService.create(recipeDto);
            console.log("created new recipe: " + newRecipe);
            return newRecipe;
        } catch (error) {
            throw new HttpException('Failed to create recipe', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const recipe = await this.recipesService.findOne(id);
            if (!recipe) {
                throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
            }
            return recipe;
        } catch (error) {
            throw new HttpException('Failed to retrieve recipe', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.recipesService.findAll();
        } catch (error) {
            throw new HttpException('Failed to retrieve recipes', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() recipeDto: RecipeDto) {
        try {
            return await this.recipesService.update(id, recipeDto);
        } catch (error) {
            throw new HttpException('Failed to update recipe', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.recipesService.delete(id);
            return { message: 'Recipe deleted successfully' };
        } catch (error) {
            throw new HttpException('Failed to delete recipe', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
