import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { MealPlanDto } from './dto/meal-plan.dto';

@Controller('meal-plans')
export class MealPlansController {
    constructor(private readonly mealPlanService: MealPlansService) {}

    @Post()
    async create(@Body() mealPlanDto: MealPlanDto) {
        return this.mealPlanService.create(mealPlanDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        console.log("?")
        return this.mealPlanService.findOne(id);
    }

    @Get()
    async findByWeek(@Query('week') week: string) {
        Logger.log(`findByWeek called with week: ${week}`, 'MealPlanController');
        return this.mealPlanService.findByWeek(week);
    }

    @Get()
    async findAll() {
        return this.mealPlanService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() mealPlanDto: MealPlanDto) {
        return this.mealPlanService.update(id, mealPlanDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.mealPlanService.delete(id);
    }
}
