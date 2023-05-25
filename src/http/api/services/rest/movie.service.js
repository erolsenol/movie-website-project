import RestService from './restService'
import { MOVIES } from '../../url/index'

const singleton = Symbol()
const singletonEnforcer = Symbol()

/**
 *
 */
class MovieService extends RestService {
  constructor(enforcer) {
    super(MOVIES)
    if (enforcer !== singletonEnforcer) throw new Error('Cannot construct Movie RestService more than one')
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new MovieService(singletonEnforcer)
    }

    return this[singleton]
  }

  getMovies(payload) {
    if (payload && typeof payload === 'object') {
      return this._api_connector.post(MOVIES.url, payload)
    } else throw new Error('Save API call requires Payload!')
  }
}

export default MovieService
