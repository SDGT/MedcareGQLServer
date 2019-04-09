import { RESTDataSource } from "apollo-datasource-rest";

export class httpRequests extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://zuuldev.sdglobaltech.com/";
  }

  willSendRequest(request) {
    request.headers.set("X-ORGCODE", this.context["X-ORGCODE"]);
    request.headers.set("X-ORGID", this.context["X-ORGID"]);
    request.headers.set("X-UNITCODE", this.context["X-UNITCODE"]);
    request.headers.set("X-UNITID", this.context["X-UNITID"]);
    request.headers.set("X-USERID", this.context["X-USERID"]);
    request.headers.set("X-USERNAME", this.context["X-USERNAME"]);
  }

  httpGet(path: string, params?: any) {
    return this.get(path, params);
  }

  httpPost(path: string, body: any) {
    return this.post(path, body);
  }
}
