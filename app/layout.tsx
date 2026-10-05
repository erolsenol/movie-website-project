import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Frames — a movie collection', description: 'A small film discovery demo with searchable fictional titles.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
