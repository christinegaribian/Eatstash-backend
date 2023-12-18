import { Injectable } from '@nestjs/common';
import { CosmosClient, Database, Container } from '@azure/cosmos';
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }

@Injectable()
export class CosmosDbService {
    private client: CosmosClient;
    private database: Database;
    private container: Container;

    constructor() {
        console.log('CosmosDB Endpoint:', process.env.COSMOSDB_ENDPOINT);
        console.log('CosmosDB Key:', process.env.COSMOSDB_KEY);
        this.client = new CosmosClient({
            endpoint: process.env.COSMOSDB_ENDPOINT,
            key: process.env.COSMOSDB_KEY
        });

        this.initialize();
    }

    private async initialize() {
        // Connect to database
        const dbResponse = await this.client.databases.createIfNotExists({
            id: 'ToDoList'
        });
        console.log(`Created database:\nToDoList\n`)

        this.database = dbResponse.database;

        // Connect to container
        const containerResponse = await this.database.containers.createIfNotExists({
            id: 'Items'
        });
        console.log(`Created container:\nItems\n`)

        this.container = containerResponse.container;
    }

    // CRUD operations go here
    // Create
    async createItem(item: any): Promise<any> {
        const { resource } = await this.container.items.create(item);
        return resource;
    }

    // Read
    async getItem(id: string): Promise<any> {
        try {
            const { resource } = await this.container.item(id).read();
            return resource;
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }

    // Read All
    async getAllItems(): Promise<any[]> {
        const { resources } = await this.container.items
            .query({
                query: 'SELECT * FROM c'
            })
            .fetchAll();
        return resources;
    }

    // Update
    async updateItem(id: string, newItem: any): Promise<any> {
        try {
            const { resource } = await this.container.item(id).replace(newItem);
            return resource;
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }

    // Delete
    async deleteItem(id: string): Promise<void> {
        try {
            await this.container.item(id).delete();
        } catch (error) {
            // Handle not found error or other errors
            throw error;
        }
    }
}
