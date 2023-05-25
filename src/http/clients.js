import MovieConnector from './api/connector/MovieConnector'

export const movieConnector = new MovieConnector(process.env.BASE_URL)
