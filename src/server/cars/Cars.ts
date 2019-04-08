import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "graphql-tools";
import { RESTDataSource } from "apollo-datasource-rest";

export const carschema = makeExecutableSchema({
  typeDefs: `
    type Car {
        id: Int!
        plateNumber: String!
        color: String!
        model: String!
        chasisNumber: String!
        vehicleStatus: String!
        yearOfManufacture: Int!
        issueDate: String!
        expiryDate: String!
      }
      type Query {
        car(plateNumber: String!): Car
        cars: [Car]
      }
    `
});

export const carresolvers = {
  Query: {
    car: (parent, { plateNumber }, { dataSources }) =>
      dataSources.mvrpAPI.getACar(plateNumber),
    cars: (parent, args, { dataSources }) => dataSources.mvrpAPI.getAllCars()
  },
  Car: {
    vehicleStatus: ({ status }) => status,
    yearOfManufacture: ({ productionYear }) => productionYear
  }
};

export class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://mvrp.herokuapp.com/api/";
  }

  async getAllCars() {
    return this.get("cars");
  }

  async getACar(plateNumber: any) {
    const result = await this.get("car", {
      plateNumber
    });

    return result[0];
  }
}
