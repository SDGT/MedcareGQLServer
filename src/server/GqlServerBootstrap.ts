
import { ApolloServer, gql } from 'apollo-server-express';

import {
        mergeSchemas,
  } from 'graphql-tools';
import { datasource } from './qldefs/datasource';
import schemadfs from './qldefs/schemas';
import resolvers from './qldefs/Resolvers';
 
  
 const schemas = mergeSchemas({
    schemas: schemadfs,
    resolvers:resolvers
  });

  const apolloserver = new ApolloServer({ 
    schema: schemas,
    dataSources: datasource
  });

  export default  apolloserver;

  