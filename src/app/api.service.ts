import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  getUsers = () => {
     return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/users');   
     //return this.http.get('http://localhost:8081/users'); 
  }



  //add?name={{Bart}}
  AddUser = () => {
    return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add');

  }

}
