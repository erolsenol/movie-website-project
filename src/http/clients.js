import MovieConnector from './api/connector/MovieConnector'

console.log('process.env.BASE_URL', process.env.BASE_URL)

console.log('create movieConnector')

export const movieConnector = new MovieConnector(process.env.BASE_URL)
