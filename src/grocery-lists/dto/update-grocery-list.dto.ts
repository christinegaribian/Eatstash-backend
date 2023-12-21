import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateGroceryListDto {
    @IsString()
    @IsOptional()
    readonly name: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    readonly items: string[]; // Array of item names or IDs

    @IsString()
    @IsOptional()
    readonly weeklyAd: string;
}