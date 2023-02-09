import { LanguageCode } from "@vendure/core";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, Min } from "class-validator";

export class UpdateProductDto {

    @IsString()
    id: string;


    @IsString()
    @IsNotEmpty()
    @Length(2)
    name: string;

    @IsString()
    languageCode: LanguageCode;

    // @Is
    // updatedAt: Date;

    // @IsObject()
    // featuredAsset: object;

    // @IsString()
    // @IsNotEmpty()
    // @Length(2)
    // deletedAt: string;

    @IsString()
    @IsNotEmpty()
    @Length(2)
    description: string;

    @IsString()
    slug: string;

    // @IsString()
    // @IsNotEmpty()
    // @Length(2)
    // review: string;



    // @IsString()
    // email: string;


    // @IsNumber()
    // price: number;

    // @IsString()
    // @IsOptional()
    // city: string;

    // @IsBoolean()
    // @IsOptional()
    // isConfirm: boolean;


}