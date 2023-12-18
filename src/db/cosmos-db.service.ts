import { Injectable } from '@nestjs/common';
import { CosmosClient, Database, Container } from '@azure/cosmos';
// const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }

@Injectable()
export class CosmosDbService {
    private client: CosmosClient;
    private database: Database;

    constructor() {
        this.client = new CosmosClient({
            endpoint: process.env.COSMOSDB_ENDPOINT,
            key: process.env.COSMOSDB_KEY
        });
        this.initializeDatabase();
    }

    private async initializeDatabase() {
        const dbResponse = await this.client.databases.createIfNotExists({
            id: 'ToDoList'
        });
        console.log(`Created database:\nToDoList\n`)
        this.database = dbResponse.database;
    }

    private getContainer(containerName: string): Container {
        return this.database.container(containerName);
    }

    // CRUD operations go here
    // Create
    async createItem(containerName: string, item: any): Promise<any> {
        const container = this.getContainer(containerName);
        return (await container.items.create(item)).resource;
    }

    // Read by ID
    async getItemById(containerName: string, id: string): Promise<any> {
        const container = this.getContainer(containerName);
        try {
            return (await container.item(id).read()).resource;
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }

    // Read All
    async getAllItems(containerName: string): Promise<any[]> {
        const container = this.getContainer(containerName);
        const { resources } = await container.items
            .query({
                query: 'SELECT * FROM c'
            })
            .fetchAll();
        return resources;
    }

    // Update
    async updateItem(containerName: string, id: string, updatedItem: any): Promise<any> {
        const container = this.getContainer(containerName);
        try {
            return (await container.item(id).replace(updatedItem)).resource;
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }

    // Delete
    async deleteItem(containerName: string, id: string): Promise<void> {
        const container = this.getContainer(containerName);
        try {
            await container.item(id).delete();
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }
}
