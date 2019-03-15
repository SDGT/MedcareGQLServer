import express from "express";
// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;

import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';


const app = express();
const port = 3000; // default port to listen
app.use(cors());

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.get('/test',function(req,res,next){
    res.send({"hello":"shaikhriyaz"});
  })

const eureka = new Eureka({
    instance: {
      app: 'exapp',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: 'http://localhost:3000',
      port: {
        '$': port,
        '@enabled': 'true',
      },
      vipAddress: 'exapp',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      }
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/'
    }
  });
  eureka.logger.level('debug');
  eureka.start((error:any)=>{
    console.log(error || 'complete');
  });
  
  const data = {
    me: {
      username: 'Robin Wieruch',
    },
  };

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});
