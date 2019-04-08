import { ApolloServer, gql } from "apollo-server-express";

import { mergeSchemas } from "graphql-tools";
import { datasource } from "../definations/datasource";
import schemadfs from "../definations/schemas";
import resolvers from "../definations/resolvers";

const schemas = mergeSchemas({
  schemas: schemadfs,
  resolvers: resolvers
});

const apolloserver = new ApolloServer({
  schema: schemas,
  dataSources: datasource,
  context: ({ req }) => {
    let headers = {
      "X-ORGCODE": req.header("X-ORGCODE"),
      "X-ORGID": req.header("X-ORGID"),
      "X-UNITCODE": req.header("X-UNITCODE"),
      "X-UNITID": req.header("X-UNITID"),
      "X-USERID": req.header("X-USERID"),
      "X-USERNAME": req.header("X-USERNAME")
    };
    return headers;
  }
});

export default apolloserver;
