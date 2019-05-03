import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MovieService } from '../../movie.service'
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  modalRef: BsModalRef;
  movie: Movie = new Movie();
  movies: any;
  img: File;
  errorMsg: ErrorMsg = new ErrorMsg();

  constructor(private modalService: BsModalService, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovie()
  }

  getMovie(){
    this.movieService.get().subscribe(res => {
      this.movies = res;
      console.log(this.movies)
    }, error => {
      console.log(error)
    })
  }

  onUpdate(){
    
  }



  onSave() {
    this.errorMsg.name = this.errorMsg.year = this.errorMsg.poster = '';
    !this.movie.name ? this.errorMsg.name = "Movie needs a name!" : '';
    !this.movie.year ? this.errorMsg.year = "Movie needs a year!" : '';
    !this.movie.poster ? this.errorMsg.poster = "Movie needs a link to poster image!" : '';

    if (!this.movie.name || !this.movie.year || !this.img) {
      return;
    }
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    //let temp;
    //let BR = (<HTMLInputElement>document.getElementById('poster')).files[0];

    //getBase64(BR).then(res => {
     // temp = res;
     // this.movie.poster = temp;
      
    //})
    this.movieService.post(this.movie).subscribe(res => {
      this.getMovie();
      this.modalRef.hide();
      console.log(res)
    }, error => {
      console.log(error)
    })

  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}

class Movie {
  name: String;
  year: String;
  poster: String;

}

class ErrorMsg {
  name: String;
  year: String;
  poster: String;

}