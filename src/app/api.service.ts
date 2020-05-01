import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Gebruiker} from './gebruiker';
import {Notities} from './notities';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  getUsers = () :Observable<Gebruiker[]> => {
    return this.http.get<Gebruiker[]>('https://jensjorisdecorte-backend-example-5.glitch.me/users');
  }

  AddUser = (naam: string) => {
    let encodedUri = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users');
    return this.http.post(encodedUri, { name: naam });
  }

  DeleteGebruikerEnNotitie = (naam: string) => { 
    let naamEncoded = encodeURIComponent(naam);
    let encodedUri = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users?name=') + naamEncoded; 
    console.log(encodedUri);
    return this.http.delete(encodedUri);
  }

  //routing in expres...
  //routing: Route path: /users/:userId/books/:bookId
  //Request URL: http://localhost:3000/users/34/books/8989
  //req.params: { "userId": "34", "bookId": "8989" }

  AddNotitie = (naam: string, notitie: string, categorie: string) => {
    let encodedUri1 = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users/');
    let naamUri = encodeURIComponent(naam);
    let encodeUri2 = encodeURI('/notes');
    let encodedUri = encodedUri1 + naamUri + encodeUri2;
    return this.http.post(encodedUri, { content: notitie , categorie: categorie});
  }

  GetNotes = (naam: string):Observable<Notities[]> => {
    let naamEncoded = encodeURIComponent(naam);
    let encodedUri = encodeURI(`https://jensjorisdecorte-backend-example-5.glitch.me/notes/?name=${naamEncoded}`);
    return this.http.get<Notities[]>(encodedUri);
  }

  GetOneNote = (id:number):Observable<Notities> => {
    console.log("in de apiService getOneNote: id is "+id);
    let encodedUri=encodeURI(`https://jensjorisdecorte-backend-example-5.glitch.me/note/?id=${id}`);
    return this.http.get<Notities>(encodedUri);
  }
 //Patch notitie (inhoud en/of categorie)/////////////////////////////////////////////////////////////////
 PatchNote = (notitie:Notities):Observable<Notities> => {
  console.log("in de apiService PatchNote:content is "+notitie.content);
  let http = `https://jensjorisdecorte-backend-example-5.glitch.me/note`;
  return this.http.patch<Notities>(http,{notitie});
}

  //zoek in notities van een gebruiker///////////////////////////////////////////////////////////////////////
  searchNotes = (naam:string, term: string, categorie:string):Observable<Notities[]> => {
    let naamEncoded = encodeURIComponent(naam);
    let termEncoded=encodeURIComponent(term);
    let categorieEncoded=encodeURIComponent(categorie);
    let http = `https://jensjorisdecorte-backend-example-5.glitch.me/notes/?name=${naamEncoded}&zoekterm=${termEncoded}&categorie=${categorieEncoded}`;
    return this.http.get<Notities[]>(http);    
  }

  //delete notitie////////////////////////////////////////////////////////////
  DeleteNotitie = (id:number) => {
    console.log("in deletenotitie binnen: "+ id)
    
    return this.http.delete(`https://jensjorisdecorte-backend-example-5.glitch.me/deleteNotitie/?id=${id}`);
  }

}
