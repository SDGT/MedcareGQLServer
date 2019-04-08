import { MvrpAPI } from "../server/cars/Cars";
import { CountryAPI } from "../server/country/Country";
import { QueueAPI } from "../server/queue-management/queue";

export const datasource = () => ({
  mvrpAPI: new MvrpAPI(),
  countryAPI: new CountryAPI(),
  queueAPI: new QueueAPI()
});
