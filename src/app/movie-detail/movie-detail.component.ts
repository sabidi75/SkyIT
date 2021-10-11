import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../movie-list/movie-service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  _movie: Movie;
  @Input() showMovieDetail: boolean;
  @Input() set movie(value: Movie) {
    if (value) {
      this._movie = value;
      this._movie.casts = value.cast.join(", ");
      this._movie.genres = value.genre.join(", ");
    }
  };
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose = () => {
      this.close.emit(this.showMovieDetail);
  }
}
