
import { Movie, Category } from './types';

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Cosmic Horizon (2024) Dual Audio [Hindi-English]',
    year: 2024,
    quality: '1080p HDRip',
    size: '1.4GB',
    category: 'Hollywood Movies',
    language: 'Hindi + English',
    imageUrl: 'https://picsum.photos/seed/movie1/300/450',
    description: 'A team of astronauts travel beyond the known universe to find a new home for humanity. They encounter strange anomalies that challenge their understanding of physics and reality.',
    rating: 8.5,
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Shadow of the Empire (2023) 480p Web-DL',
    year: 2023,
    quality: '480p Web-DL',
    size: '450MB',
    category: 'Bollywood Movies',
    language: 'Hindi',
    imageUrl: 'https://picsum.photos/seed/movie2/300/450',
    description: 'An undercover agent infiltrates a dangerous criminal organization in the heart of Mumbai. Time is running out as he uncovers a conspiracy that goes all the way to the top.',
    rating: 7.2
  },
  {
    id: '3',
    title: 'Neon Knights: Origins (2024) 720p WEB-DL [Dual Audio]',
    year: 2024,
    quality: '720p WEB-DL',
    size: '1.2GB',
    category: 'Hollywood Movies',
    language: 'Hindi + English',
    imageUrl: 'https://picsum.photos/seed/movie3/300/450',
    description: 'In a cyberpunk future, a group of rebels fights against an oppressive megacorporation using high-tech weaponry and ancient combat skills.',
    rating: 7.8,
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'The Silent Forest (2023) Multi-Audio WEB-DL',
    year: 2023,
    quality: '1080p WEB-DL',
    size: '2.1GB',
    category: '300MB Movies',
    language: 'Hindi + Tamil + Telugu',
    imageUrl: 'https://picsum.photos/seed/movie4/300/450',
    description: 'A supernatural horror story set in the deep forests of North India. A group of hikers vanishes, leaving behind only chilling recordings of what they found.',
    rating: 6.9,
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'Gladiator Reborn (2024) IMAX Edition [Dual Audio]',
    year: 2024,
    quality: '1080p IMAX',
    size: '2.8GB',
    category: 'Hollywood Movies',
    language: 'Hindi + English',
    imageUrl: 'https://picsum.photos/seed/movie5/300/450',
    description: 'The legacy of Rome continues in this epic tale of vengeance and honor. A fallen commander returns to the arena to claim his freedom and restore justice.',
    rating: 8.9
  },
  {
    id: '6',
    title: 'Lost in Translation: Remastered (2024) 720p',
    year: 2024,
    quality: '720p BluRay',
    size: '950MB',
    category: '720p Movies',
    language: 'English',
    imageUrl: 'https://picsum.photos/seed/movie6/300/450',
    description: 'A modern retelling of the classic tale of connection in a foreign land. Two strangers find solace in each other\'s company amidst the neon lights of Tokyo.',
    rating: 7.5,
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '7',
    title: 'Dangal Returns (2024) 1080p Web-DL',
    year: 2024,
    quality: '1080p Web-DL',
    size: '2.4GB',
    category: 'Bollywood Movies',
    language: 'Hindi',
    imageUrl: 'https://picsum.photos/seed/movie7/300/450',
    description: 'The story of a father who trains his daughters to become world-class wrestlers against all odds, now featuring a new generation of champions.',
    rating: 9.1
  },
  {
    id: '8',
    title: 'Space Junkies (2023) 300MB HEVC',
    year: 2023,
    quality: '720p HEVC',
    size: '300MB',
    category: '300MB Movies',
    language: 'English',
    imageUrl: 'https://picsum.photos/seed/movie8/300/450',
    description: 'A quirky group of space salvagers accidentally discovers a lost royal vessel containing secrets that could end the intergalactic war.',
    rating: 6.4
  },
  {
    id: '9',
    title: 'Midnight in Mumbai (2024) Dual Audio',
    year: 2024,
    quality: '1080p HDRip',
    size: '1.8GB',
    category: 'Dual Audio Movies',
    language: 'Hindi + English',
    imageUrl: 'https://picsum.photos/seed/movie9/300/450',
    description: 'A gripping noir thriller set in the bustling streets of Mumbai where a detective follows a trail of clues that lead to the city\'s dark underbelly.',
    rating: 7.7
  },
  {
    id: '10',
    title: 'The Great Indian Escape (2024) 720p',
    year: 2024,
    quality: '720p Web-DL',
    size: '850MB',
    category: 'Bollywood Movies',
    language: 'Hindi',
    imageUrl: 'https://picsum.photos/seed/movie10/300/450',
    description: 'Based on true events, this survival drama follows a group of prisoners attempting a daring escape from a high-security facility.',
    rating: 8.2
  },
  {
    id: '11',
    title: 'Eternal Echoes (2023) 1080p Dual Audio',
    year: 2023,
    quality: '1080p WEB-DL',
    size: '2.2GB',
    category: 'Dual Audio Movies',
    language: 'Hindi + English',
    imageUrl: 'https://picsum.photos/seed/movie11/300/450',
    description: 'A scientist discovers a way to communicate with parallel universes, but the price of connection is higher than he ever imagined.',
    rating: 7.9
  },
  {
    id: '12',
    title: 'Vikram Vedha: The Beginning (2024) 480p',
    year: 2024,
    quality: '480p HDRip',
    size: '400MB',
    category: 'South Hindi Dubbed',
    language: 'Hindi',
    imageUrl: 'https://picsum.photos/seed/movie12/300/450',
    description: 'A brave police officer sets out to capture a dangerous gangster, only to find that the lines between good and evil are blurred.',
    rating: 8.6
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: '300MB Movies', count: 1250 },
  { id: '2', name: '720p Movies', count: 840 },
  { id: '3', name: '1080p Movies', count: 420 },
  { id: '4', name: 'Bollywood Movies', count: 3200 },
  { id: '5', name: 'Hollywood Movies', count: 2800 },
  { id: '6', name: 'Dual Audio Movies', count: 1500 },
  { id: '7', name: 'Netflix Original', count: 120 },
  { id: '8', name: 'Amazon Prime', count: 95 },
  { id: '9', name: 'South Hindi Dubbed', count: 1800 },
  { id: '10', name: 'Animated Movies', count: 450 },
];
