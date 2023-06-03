import RestService from './restService'
import { MOVIES } from '../../url/index'

const singleton = Symbol()
const singletonEnforcer = Symbol()

/**
 *
 */
class MovieService extends RestService {
  constructor(enforcer) {
    super(MOVIES.base)
    if (enforcer !== singletonEnforcer) throw new Error('Cannot construct Movie RestService more than one')
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new MovieService(singletonEnforcer)
    }

    return this[singleton]
  }

  getMovies() {
    return this._api_connector.get(MOVIES.getMovies.url)
  }
}

export default MovieService
