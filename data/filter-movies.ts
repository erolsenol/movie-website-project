import type { Movie } from './movies';

export type GenreFilter = Movie['genre'] | 'All';

export function filterMovies(movies: readonly Movie[], query: string, genre: GenreFilter): readonly Movie[] {
  const normalizedQuery = query.trim().toLowerCase();
  return movies.filter((movie) =>
    (genre === 'All' || movie.genre === genre) &&
    (!normalizedQuery || `${movie.title} ${movie.synopsis}`.toLowerCase().includes(normalizedQuery)));
}
