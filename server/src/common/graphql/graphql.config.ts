import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

export const GraphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema/schema.graphql'),
  playground: true,
  introspection: true,
  context: null,
};
