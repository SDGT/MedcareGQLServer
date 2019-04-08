import { makeExecutableSchema } from "graphql-tools";
import { httpRequests } from "../../utilities/http-request";

export const patientschema = makeExecutableSchema({
  typeDefs: `
    type Patient {
        id: String!
        unitCode: String
        gender: String
        birthDate: String
        race: String
        patientCategory: String
        occupation: String
        age: String
        nationality: String
        mrnno: String
        registrationDate: String
        name: [Name]
        address: [Address]
      }
      type Name {
        use: String!
        text: String!
      }
      type Address {
        country: String
        state: String
        city: String
      }
      type Query {
        patients(name: String!): [Patient]
      }
    `
});

export const patientresolvers = {
  Query: {
    patients: (parent, { name }, { dataSources }) => {
      return dataSources.patientAPI.getAllPatients(name);
    }
  }
};

export class PatientAPI extends httpRequests {
  async getAllPatients(name: string) {
    let patients = this.httpPost("opd-service/extendedPatient/advanceSearch", {
      name: name,
      gender: "",
      identity: { type: "" },
      address: { use: "temp", country: "", state: "", city: "" },
      registrationDate: { start: null, end: null }
    });
    return patients;
  }
}
