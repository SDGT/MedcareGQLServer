import { RESTDataSource } from 'apollo-datasource-rest';

export class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mvrp.herokuapp.com/api/';
  }

  async getAllCars() {
    return this.get('cars');
  }

  async getACar(plateNumber: any) {
    const result = await this.get('car', {
      plateNumber
    });

    return result[0];
  }
};

export const datasource= () => ({
    mvrpAPI: new MvrpAPI()
  })
