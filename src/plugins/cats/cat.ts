import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';
import http from 'http';
import { Allow, Ctx, PluginCommonModule, ProductService, 
    RequestContext, VendureConfig, VendurePlugin } from '@vendure/core';
import { Permission } from '@vendure/common/lib/generated-types';
import { ProductsController } from './products.controller';
//import { ProductsController } from './products.controller';
//import { ProductsController } from './products.controller';
// import { CatTestController } from 'src/cat-test/cat-test.controller';
// import { ProductsController } from './products.controller';
// import { TodosController} from './controller/todo.controller';
// import { TodosService, TodoInterface } from './provider/todo.service';
// import { TodosModule } from './module/todo.module';
// import { UsersController } from './users.controller';
// import { ProductsService } from './products.service';
// import { ProductsModule } from './product.module';
// import { ProductRepository } from './product.repository';

const schemaExtension = gql`
    extend type Mutation {
        addRandomCat(id: ID!): Product!
    }
`;

@Injectable()
export class CatFetcher {
  /** Fetch a random cat image url from random.cat */
  fetchCat(): Promise<string> {
    return new Promise((resolve) => {
      http.get('http://aws.random.cat/meow', (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => resolve(JSON.parse(data).file));
      });
    });
  }
}

@Resolver()
export class RandomCatResolver {
  constructor(private productService: ProductService, 
              private catFetcher: CatFetcher) {}

  @Mutation()
  async addRandomCat(@Ctx() ctx: RequestContext, @Args() args: any) {
    const catImageUrl = await this.catFetcher.fetchCat();
    return this.productService.update(ctx, {
      id: args.id,
      customFields: { catImageUrl },
    });
  }
}

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [ProductsController],
  providers: [CatFetcher ],
  adminApiExtensions: {
    schema: schemaExtension,
    resolvers: [RandomCatResolver],
  },
  configuration: config => {
    config.customFields.Product.push({
      type: 'string',
      name: 'catImageUrl',
    });
    return config;
  }
})
export class RandomCatPlugin {}