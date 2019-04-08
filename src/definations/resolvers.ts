import { carresolvers } from "../server/cars/Cars";
import { countryresolvers } from "../server/country/Country";
import { queueresolvers } from "../server/queue-management/queue";
import { patientresolvers } from "../server/patient/patient";

const resolvers = [
  carresolvers,
  countryresolvers,
  queueresolvers,
  patientresolvers
];

export default resolvers;
