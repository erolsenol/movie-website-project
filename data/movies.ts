export interface Movie {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly genre: 'Drama' | 'Mystery' | 'Adventure';
  readonly synopsis: string;
  readonly tone: string;
}

// Fictional entries keep this demo independent of third-party data and image licenses.
export const movies: readonly Movie[] = [
  { id: 'blue-hour', title: 'Blue Hour', year: 2025, genre: 'Drama', synopsis: 'A photographer returns to a city she once called home.', tone: 'blue' },
  { id: 'last-signal', title: 'The Last Signal', year: 2024, genre: 'Mystery', synopsis: 'An unexplained broadcast leads two friends across the coast.', tone: 'amber' },
  { id: 'northbound', title: 'Northbound', year: 2026, genre: 'Adventure', synopsis: 'A long train journey changes the plans of everyone aboard.', tone: 'green' },
  { id: 'glass-garden', title: 'Glass Garden', year: 2023, genre: 'Drama', synopsis: 'A family rebuilds a greenhouse and a fragile relationship.', tone: 'rose' },
  { id: 'after-rain', title: 'After the Rain', year: 2022, genre: 'Mystery', synopsis: 'A missing journal resurfaces in a quiet mountain town.', tone: 'violet' },
  { id: 'open-water', title: 'Open Waterline', year: 2025, genre: 'Adventure', synopsis: 'A small crew maps a route no one has taken in decades.', tone: 'teal' },
];
