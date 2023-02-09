import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { CreateProductInput } from '@vendure/common/lib/generated-types';
import { ConfigArgService, Ctx, ID, ProductService, RequestContext } from '@vendure/core'; 
//import { CreateUserDto } from './dto/create.user.dto';
import { UpdateProductDto } from './dto/update.product.dto';
//import { ProductsService } from './products.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductDto } from './dto/create.product.dto';


@Controller('products')
export class ProductsController {
  constructor( private productService: ProductService) {}

//   @Get(`all`)
//    async findAll() {
//     const products =  await this.productsService.getAll();
//     console.log(products);
//     return products;
//   }

  @Get()
  findAll(@Ctx() ctx: RequestContext) {
    return this.productService.findAll(ctx);
  }

    @Get(':id')
    async findOne(@Ctx() ctx: RequestContext, @Param() params: any) {
        const allProducts = await this.productService.findAll(ctx);
        console.log(allProducts.items[params.id-1]);
        console.log(params.id-1);


        return allProducts.items[params.id -1];
    }

    @Post()
  async addProduct(@Ctx() ctx: RequestContext, @Args() args: CreateProductDto, input: CreateProductInput, @Body() createproductDto: CreateProductDto) {
      console.log(input)
      console.log(ctx)
      console.log(args)
      console.log(createproductDto)
      const name = createproductDto.name;


      const product = await this.productService.create(ctx, {
          customFields: createproductDto,
          translations: [createproductDto]
      }
        )
    //    this.productService.create(ctx, {
    //     translations: {
        
    //     }
    //    })
    return product
  }


    @Mutation()
    @Put(':id')
  async addSomeInfo(@Ctx() ctx: RequestContext, @Args() args: any, user: UpdateProductDto, @Param() params: any, @Body() updateproductDto: UpdateProductDto) {
   // const catImageUrl = await this.catFetcher.fetchCat();
   console.log(args.id);
   console.log(user);
   console.log(params.id)

   const input = args.name;
   console.log(args);
   console.log(updateproductDto);


    const product = await this.productService.update(ctx, {
      id: params.id ,
      customFields: updateproductDto,
      translations: [updateproductDto],
      //customFields: {input},
      //product.review: 

    //   featuredAsset: {
    //     name: {args.name}
    //   }
    //   deletedAt.name: {input},
    //   featuredAsset.name
    //   name: {input},
    //   name: args.name,
    //   description: args.description,
      //customFields: { catImageUrl },
      
    });
    return product;
  }

    @Delete(':id')
     async remove(@Param() param: any, @Ctx() ctx: RequestContext,  @Args() args: any) {
      console.log(args.id)
      console.log(param.id)

     return await this.productService.softDelete(ctx, param.id)
    //return "user deleted"
  }



//   @Put(`/:id`)
//   updateUserById(@Ctx() ctx: RequestContext, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Args() args: any) {
//       return this.productService.update(ctx, {
        
//         id: args.id,
//         name:{updateProductDto.name},
//     })
//   }



    //   @Get(':id')
//   findOne(@Param() params: any): string {
//   console.log(params.id);
//   return `This action returns a #${params.id} cat`;
//     }

    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto) {
    // return this.productService.create(createUserDto)
    // }


//   @Put(`/: id`)
//   updateProduct(@Ctx() ctx: RequestContext, productId: ID) {
//     const product =  this.productService.findOne(ctx, productId);
//   }






//   @Post()
//   create(@Ctx() ctx: RequestContext, input: CreateProductInput) {
//     return this.productService.create(ctx, input);
//   }

//   @Post()
//   createProduct(@Body() createUserDto: CreateUserDto) {
//     return this.productService.create(createUserDto);
//   }
}
