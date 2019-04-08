import { carschema } from "../server/cars/Cars";
import { countryschema } from "../server/country/Country";
import { queueschema } from "../server/queue-management/queue";
import { patientschema } from "../server/patient/patient";

const schemadfs = [carschema, countryschema, queueschema, patientschema];

export default schemadfs;
