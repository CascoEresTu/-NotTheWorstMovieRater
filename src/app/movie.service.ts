import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
  baseUrl = 'https://intense-fortress-36753.herokuapp.com/'

  get(){
    return this.http.get(this.baseUrl + '/api/getMovie');
  }

  post(data){
    return this.http.post(this.baseUrl + '/api/NewMovie',data)
  }

}
