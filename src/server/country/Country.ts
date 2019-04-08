import { makeExecutableSchema } from "graphql-tools";
import { RESTDataSource } from "apollo-datasource-rest";
const https = require("https");

export const countryschema = makeExecutableSchema({
  typeDefs: `
    type Country {
        id: Int!
        code: String!
        desc: String!
      }
      type Query {
        country(id: String!): Country
        countries: [Country]
      }
    `
});

export const countryresolvers = {
  Query: {
    country: (root, { plateNumber }, { dataSources }) =>
      dataSources.countryAPI.getACountry(plateNumber),
    countries: (root, args, { dataSources }) =>
      dataSources.countryAPI.getAllCountries()
  }
  //,
  // Country: {
  //   vehicleStatus: ({ status }) => status,
  //   yearOfManufacture: ({ productionYear }) => productionYear
  // }
};

export class CountryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://zuulqa.sdglobaltech.com/master-service/Masters";
  }

  async getAllCountries() {
    return this.get("/CountryMaster");
  }

  async getACountry(id: any) {
    const result = await this.get("CountryMaster", {
      id
    });

    return result;
  }
}
