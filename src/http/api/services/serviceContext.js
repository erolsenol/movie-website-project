import MovieService from './rest/movie.service'

const singleton = Symbol()
const singletonEnforcer = Symbol()

/**
 * @author   <halil.kilicarslan@globme.com.tr>
 * @description SERVICE CONTEXT IS SINGLETON ACCESSOR TO IDENFIT SERVICE INSTANCES
 */
class ServiceContext {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct RestService Facade more than one')
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ServiceContext(singletonEnforcer)
    }

    return this[singleton]
  }

  /**
   * @returns {*}
   */
  get movieService() {
    return MovieService.instance
  }
}

export default ServiceContext.instance
