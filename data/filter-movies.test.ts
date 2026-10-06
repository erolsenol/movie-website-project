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

  it('matches ASCII I consistently regardless of the browser locale', () => {
    const lower = String.prototype.toLocaleLowerCase;
    String.prototype.toLocaleLowerCase = function () { return lower.call(this, 'tr'); };
    try { expect(filterMovies(movies, 'SIGNAL', 'All').map((movie) => movie.id)).toEqual(['last-signal']); }
    finally { String.prototype.toLocaleLowerCase = lower; }
  });
  it('handles whitespace-only queries and combined filters', () => {
    expect(filterMovies(movies, '  ', 'All')).toHaveLength(movies.length);
    expect(filterMovies(movies, 'signal', 'Drama')).toEqual([]);
  });
