import { MvrpAPI } from "../server/cars/Cars";
import { CountryAPI } from "../server/country/Country";
import { QueueAPI } from "../server/queue-management/queue";
import { PatientAPI } from "../server/patient/patient";

export const datasource = () => ({
  mvrpAPI: new MvrpAPI(),
  countryAPI: new CountryAPI(),
  queueAPI: new QueueAPI(),
  patientAPI: new PatientAPI()
});
