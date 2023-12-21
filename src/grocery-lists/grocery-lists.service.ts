import { Injectable, NotFoundException } from '@nestjs/common';
import { CosmosDbService } from '../db/cosmos-db.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';
import { UpdateGroceryListDto } from './dto/update-grocery-list.dto';

const GROCERY_LIST_CONTAINER_NAME = 'GroceryLists';

@Injectable()
export class GroceryListsService {
  constructor(private readonly cosmosDbService: CosmosDbService) {}

  async create(createGroceryListDto: CreateGroceryListDto) {
    console.log("creating")
    return await this.cosmosDbService.createItem(GROCERY_LIST_CONTAINER_NAME, createGroceryListDto);
  }

  async findAll() {
    return await this.cosmosDbService.getAllItems(GROCERY_LIST_CONTAINER_NAME);
  }

  async findOne(id: string) {
    const groceryList = await this.cosmosDbService.getItemById(GROCERY_LIST_CONTAINER_NAME, id);
    if (!groceryList) {
      throw new NotFoundException(`Grocery list with ID ${id} not found`);
    }
    return groceryList;
  }

  async update(id: string, updateGroceryListDto: UpdateGroceryListDto) {
    const existingGroceryList = await this.findOne(id); // This will throw NotFoundException if not found
    const updatedGroceryList = { ...existingGroceryList, ...updateGroceryListDto };
    return await this.cosmosDbService.updateItem(GROCERY_LIST_CONTAINER_NAME, id, updatedGroceryList);
  }

  async remove(id: string) {
    await this.cosmosDbService.deleteItem(GROCERY_LIST_CONTAINER_NAME, id);
  }
}
