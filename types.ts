
export interface Movie {
  id: string;
  title: string;
  year: number;
  quality: string;
  size: string;
  category: string;
  language: string;
  imageUrl: string;
  description: string;
  rating: number;
  trailerUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'vip';
}
