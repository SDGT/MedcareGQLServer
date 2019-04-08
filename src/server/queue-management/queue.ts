import { makeExecutableSchema } from "graphql-tools";
import { httpRequests } from "../../utilities/http-request";

export const queueschema = makeExecutableSchema({
  typeDefs: `
    type Queue {
        callBy: String!
        createdBy: String!
        date: String!
        datetime: String!
        department: String!
        doctor: String!
        encounterNo: String!
        id: String!
        mrn: String!
        noShowBy: String!
        patientNm: String!
        roomNo: String!
        sequenceNumber: String!
        status: String!
        tokenNo: String!
        unitCode: String!
      }
      type Query {
        queuesFiltered(doctor: String!, department: String!): [Queue]
        queues: [Queue]
      }
    `
});

export const queueresolvers = {
  Query: {
    queues: (parent, args, { dataSources }) => {
      return dataSources.queueAPI.getAllQueues();
    },
    queuesFiltered: (parent, { doctor, department }, { dataSources }) =>
      dataSources.queueAPI.getFilteredQueues(doctor, department)
  }
};

export class QueueAPI extends httpRequests {
  async getAllQueues() {
    return this.httpGet("que-service/que/byunitcode");
  }

  async getFilteredQueues(doctor: string, department: string) {
    return this.httpGet("que-service/que/bycriteria", {
      doctor,
      department
    });
  }
}
