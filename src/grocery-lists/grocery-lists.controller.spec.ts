import { Test, TestingModule } from '@nestjs/testing';
import { GroceryListsController } from './grocery-lists.controller';

describe('GroceryListsController', () => {
  let controller: GroceryListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryListsController],
    }).compile();

    controller = module.get<GroceryListsController>(GroceryListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
