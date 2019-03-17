import express from "express";
import path from  "path";
import bodyParser from 'body-parser';
import router from './server/routes/api';


// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;

import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';


const app = express();
const port = 3000; // default port to listen
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 // Point static path to dist
 app.use(express.static('webapp-distribution/public'));

// Set our api routes
app.use('/api', router);





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
        username: 'mj',
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
 
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
