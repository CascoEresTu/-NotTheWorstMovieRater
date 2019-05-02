import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import {ModalModule} from 'ngx-bootstrap/modal'
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class MoviesModule { }
