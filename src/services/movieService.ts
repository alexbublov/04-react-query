import axios from 'axios';
import type { Movie } from '../types/movie';
import { VITE_TMDB_TOKEN } from '../vite.env.d';

export const serverApi = axios.create({
  baseURL: 'https://api.themoviedb.org',
});

export interface GetMoviesResponse {
  page: number;
  results: Movie[];
}

export interface GetMoviesParams {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export const getMovies = async (
  params: GetMoviesParams
): Promise<GetMoviesResponse> => {
  const res = await serverApi.get<GetMoviesResponse>('/3/search/movie', {
    params,
    headers: {
      Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    },
  });
  return res.data;
};
