import { queueresolvers } from "../server/queue/queue";
import { patientresolvers } from "../server/patient/patient";

const resolvers = [queueresolvers, patientresolvers];

export default resolvers;
