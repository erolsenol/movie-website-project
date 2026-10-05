import { describe, expect, it } from 'vitest';
import { filterMovies } from './filter-movies';
import { movies } from './movies';

describe('filterMovies', () => {
  it('filters title and genre without changing the source collection', () => {
    expect(filterMovies(movies, '  signal ', 'Mystery').map((movie) => movie.id)).toEqual(['last-signal']);
    expect(movies).toHaveLength(6);
  });
  it('returns an empty collection for an unmatched query', () => {
    expect(filterMovies(movies, 'not a movie', 'All')).toEqual([]);
  });
});
