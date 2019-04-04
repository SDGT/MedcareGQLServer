import express from "express";
import path from  "path";
import bodyParser from 'body-parser';
import router from './server/routes/api';


// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;

import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import { apolloserver } from "./server/GQLDefs";



const app = express();
const port = 3000; // default port to listen
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 // Point static path to dist
 app.use(express.static('public'));

// Set our api routes
app.use('/api', router);

const server = apolloserver;

server.applyMiddleware({ app, path: '/graphql' });


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
 
// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});


