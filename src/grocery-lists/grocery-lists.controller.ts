import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, NotFoundException } from '@nestjs/common';
import { GroceryListsService } from './grocery-lists.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';
import { UpdateGroceryListDto } from './dto/update-grocery-list.dto';

@Controller('grocery-lists')
export class GroceryListsController {
  constructor(private readonly groceryListsService: GroceryListsService) {}

  @Post()
  async create(@Body() createGroceryListDto: CreateGroceryListDto) {
    console.log("creating")
    return await this.groceryListsService.create(createGroceryListDto);
  }

  @Get()
  async findAll() {
    return await this.groceryListsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const groceryList = await this.groceryListsService.findOne(id);
    if (!groceryList) {
      throw new NotFoundException('Grocery list not found');
    }
    return groceryList;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroceryListDto: UpdateGroceryListDto) {
    return await this.groceryListsService.update(id, updateGroceryListDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.groceryListsService.remove(id);
  }
}
