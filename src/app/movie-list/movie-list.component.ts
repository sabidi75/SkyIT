import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from './movie-service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  allMovies: Movie[];
  selectedMovie: Movie;

  certifications: any[];

  directors: any[];
  selectedDirectors: any[];

  loading: boolean = true;
  showMovieDetail: boolean = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  setSelectedDirector = (item: any) => {
    this.selectedDirectors = item;    

    let selectedValues = this.selectedDirectors.map((m) => { return m.label });

    if (selectedValues && selectedValues.length > 0) {
      this.movies = this.allMovies.filter(m => selectedValues.includes(m.director))
    } else {
      this.movies = this.allMovies;
    }
  }

  loadMovies = () => {
    this.movieService.get()
      .subscribe((movies) => {
        this.movies = movies;
        this.movies.forEach(m => {
          m.rating = parseFloat((Number(m.rating) / 5 * 100).toString()).toFixed(2) + "%";
          if (m.certification === "General") {
            m.cert = "General";
          } else if (m.certification === "CA-PG") {
            m.cert = "CA-PG";
          } else if (m.certification === "14 Accompaniment") {
            m.cert = "14-Accompaniment";
          }
        })
        this.allMovies = this.movies;
        this.loading = false;
        this.loadCertifications();        
        this.loadDirectors();
      });
  }

  loadCertifications = () => {
    this.certifications = [];
    this.allMovies.map(m => {
      let index = this.certifications.findIndex(c => c.label === m.certification);
      if  ( index === -1){
        this.certifications.push(
          {label: m.certification, value: m.certification}
        )
      }
    });
  }

  loadDirectors = () => {
    this.directors = [];
    this.allMovies.map(m => {
      let index = this.directors.findIndex(c => c.label === m.director);
      if  ( index === -1){
        this.directors.push(
          {label: m.director, value: m.director}
        )
      }
    });
  }  

  onRowClick = (item: Movie) => {
    this.selectedMovie = item;
    this.showMovieDetail = true;
  }

  onMovieDialogClose = (data: boolean) => {
    this.showMovieDetail = data;
  }

  clear(table: Table) {
    table.clear();
  }  
}
