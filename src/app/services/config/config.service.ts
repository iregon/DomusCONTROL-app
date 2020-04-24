import data from 'src/app/services/config/installation.json';

export class ConfigService {
  private config: any;

  constructor() {}

  getConfig() {
    return data;
  }
}
