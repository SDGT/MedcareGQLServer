import { QueueAPI } from "../server/queue/queue";
import { PatientAPI } from "../server/patient/patient";

export const datasource = () => ({
  queueAPI: new QueueAPI(),
  patientAPI: new PatientAPI()
});
