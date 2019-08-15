import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./server/routes/api";
import cors from "cors";
import apolloserver from "./server/apolloserver";
const Eureka = require("eureka-js-client").Eureka;
import dotenv from "dotenv";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen
app.use(cors());
app.options("*", cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Requested-With, X-ORGCODE, X-ORGID, X-UNITCODE, X-UNITID, X-USERID, X-USERNAME"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header("Access-Control-Allow-Credentials", "false");

  // Pass to next layer of middleware
  next();
});

// Set our api routes
app.use("/api", router);

const server = apolloserver;

server.applyMiddleware({ app, path: "/graphql" });

// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const eureka = new Eureka({
  instance: {
    app: "GRAPHQL-SERVICE",
    hostName: process.env.EUREKA_IP + ":" + process.env.SERVER_PORT,
    ipAddr: "127.0.0.1",
    //statusPageUrl: "http://192.168.120.14:3000/graphql",
    port: {
      $: port,
      "@enabled": "true"
    },
    vipAddress: "GRAPHQL-SERVICE",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn"
    },
    healthCheckUrl: 'http://' + process.env.EUREKA_IP + ":" + process.env.SERVER_PORT + "/graphql",
  },
  eureka: {
    host: process.env.EUREKA_IP,
    port: process.env.EUREKA_PORT,
    servicePath: "/eureka/apps/"
  }
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`server started at http://localhost:${port}`);
});

eureka.start((error: any) => {
  console.log(error || "complete");
});
