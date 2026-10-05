'use client';

import { useMemo, useState } from 'react';
import { filterMovies, type GenreFilter } from '../data/filter-movies';
import type { Movie } from '../data/movies';

interface Props { readonly movies: readonly Movie[]; }
const genres: readonly GenreFilter[] = ['All', 'Drama', 'Mystery', 'Adventure'];

export default function MovieExplorer({ movies }: Props) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<GenreFilter>('All');
  const visibleMovies = useMemo(() => filterMovies(movies, query, genre), [movies, query, genre]);

  return <section className="explore" aria-labelledby="explore-title">
    <div className="explore-heading"><div><p className="eyebrow">Curated collection</p><h2 id="explore-title">Explore films</h2></div><p>{visibleMovies.length} titles</p></div>
    <div className="controls"><label>Search films<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title or story" /></label><div className="genre-list" aria-label="Filter by genre">{genres.map((item) => <button key={item} type="button" aria-pressed={genre === item} onClick={() => setGenre(item)}>{item}</button>)}</div></div>
    {visibleMovies.length === 0 ? <p className="empty">No films match your search.</p> : <ul className="movie-grid">{visibleMovies.map((movie) => <li key={movie.id} className={`movie-card movie-card--${movie.tone}`}><div className="movie-art" aria-hidden="true"><span>{movie.title}</span></div><div className="movie-details"><p>{movie.genre} · {movie.year}</p><h3>{movie.title}</h3><p>{movie.synopsis}</p></div></li>)}</ul>}
  </section>;
}
