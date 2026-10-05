import MovieExplorer from '../components/MovieExplorer';
import { movies } from '../data/movies';

export default function HomePage() {
  return <main><header className="site-header"><a href="/" aria-label="Frames home">FRAMES<span>.</span></a><span>A movie collection</span></header><section className="hero"><p className="eyebrow">Stories worth finding</p><h1>Find your next<br /><em>favorite frame.</em></h1><p>Browse a small collection of fictional films. Search by story or narrow the list by genre.</p><a href="#explore-title">Explore the collection <span aria-hidden="true">↘</span></a></section><MovieExplorer movies={movies} /><footer><span>FRAMES.</span><p>Demo data. No accounts, tracking, or external movie API.</p></footer></main>;
}
