import { movieConnector } from '../../../clients'

/**
 *
 */
class Service {
  constructor() {
    this._api_connector = movieConnector.getClient()
  }
}

export default Service
