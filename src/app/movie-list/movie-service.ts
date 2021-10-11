import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  get = () => {
    return this.http
      .get<Movie[]>('https://skyit-coding-challenge.herokuapp.com/movies')
      .pipe(
        map((response: Movie[]) => {
          return response;
        }),
        catchError(this.handleError)
      );
  };

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}

export interface Movie {
  genre: string[];
  genres: string;
  cast: string[];
  casts: string;
  _id: string;
  title: string;
  releaseDate: string;
  length: string;
  director: string;
  certification: string;
  cert: string;
  rating: string;
  plot: string;
}
