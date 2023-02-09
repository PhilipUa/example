import { LanguageCode } from "@vendure/core";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, Min } from "class-validator";


export class CreateProductDto {

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    languageCode: LanguageCode;

    @IsString()
    description: string;

    @IsString()
    slug: string;

    // @IsNumber()
    // price: number;
}