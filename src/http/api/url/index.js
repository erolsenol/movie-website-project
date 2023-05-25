import services from './resources/services'
import endpoints from './resources/endpoints'
import URL from './generators/rest_url'

/**
 *
 * @type {RestUrl}
 */
export const MOVIES = new URL(services.movie_service, endpoints.movies)
