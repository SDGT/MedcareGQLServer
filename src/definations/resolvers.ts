import { carresolvers } from "../server/cars/Cars";
import { countryresolvers } from "../server/country/Country";
import { queueresolvers } from "../server/queue-management/queue";

const resolvers = [carresolvers, countryresolvers, queueresolvers];

export default resolvers;
