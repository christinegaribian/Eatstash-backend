import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGroceryListDto {
    @IsString()
    readonly name: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    readonly items: string[]; // Array of item names or IDs

    @IsString()
    @IsOptional()
    readonly weeklyAd: string;
}