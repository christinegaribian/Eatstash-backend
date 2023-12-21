import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { GroceryListsService } from './grocery-lists.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';
import { UpdateGroceryListDto } from './dto/update-grocery-list.dto';
import { Logger } from '@nestjs/common';

@Controller('grocery-lists')
export class GroceryListsController {
  constructor(private readonly groceryListsService: GroceryListsService) {}

  @Post()
  async create(@Body() createGroceryListDto: CreateGroceryListDto) {
    Logger.log(`create grocery list called with createGroceryListDto: ${createGroceryListDto}`, 'GroceryListController');
    return await this.groceryListsService.create(createGroceryListDto);
  }

  @Get()
  async findAll() {
    Logger.log(`findAll grocery list called`, 'GroceryListController');
    return await this.groceryListsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    Logger.log(`get grocery list called with id: ${id}`, 'GroceryListController');
    const groceryList = await this.groceryListsService.findOne(id);
    if (!groceryList) {
      throw new NotFoundException('Grocery list not found');
    }
    return groceryList;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroceryListDto: UpdateGroceryListDto) {
    Logger.log(`update grocery list called with id: ${id} and dto: ${updateGroceryListDto}`, 'GroceryListController');
    return await this.groceryListsService.update(id, updateGroceryListDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    Logger.log(`delete grocery list called with id: ${id}`, 'GroceryListController');
    await this.groceryListsService.remove(id);
  }
}
