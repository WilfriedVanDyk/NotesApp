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



  
  AddUser = (naam:string) => {
    //replace om de witte spaties eruit te halen en er plussen van te maken
    return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add?name='+naam);

  }
//addnote?name=Bart&content=Dit+is+een+voorbeeld+notitie 
  AddNotitie = (naam:string, notitie:string) => {
    return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name='+naam+'&content='+notitie);
  }

  DeleteGebruikerEnNotitie = (naam:string) => {
    return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name='+naam);
  }

  GetNotes = (naam:string) => {
    return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name='+naam);
  }
}
