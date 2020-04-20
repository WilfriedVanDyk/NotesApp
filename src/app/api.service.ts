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

  
  // //kan ook, maar is niet typeSafe
  // getUsers = () => {
  //   return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/users');
  // }

  //typeSafe en gebruik maken van observable
  getUsers = () :Observable<Gebruiker[]> => {
    return this.http.get<Gebruiker[]>('https://jensjorisdecorte-backend-example-5.glitch.me/users');
  }

  AddUser = (naam: string) => {
    let encodedUri = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users');
    return this.http.post(encodedUri, { name: naam });
  }

  DeleteGebruikerEnNotitie = (naam: string) => {
    console.log("in de service deletemethod!");
    let naamEncoded = encodeURIComponent(naam);
    let encodedUri = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users?name=') + naamEncoded; //kan beter met /user?name=
    console.log(encodedUri);
    return this.http.delete(encodedUri);
  }

  //routing in expres...
  //routing: Route path: /users/:userId/books/:bookId
  //Request URL: http://localhost:3000/users/34/books/8989
  //req.params: { "userId": "34", "bookId": "8989" }

  AddNotitie = (naam: string, notitie: string, categorie: string) => {
    console.log('in de addNotitie binnen ' + naam +" " + notitie+" "  + categorie);
    let encodedUri1 = encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users/');
    let naamUri = encodeURIComponent(naam);
    let encodeUri2 = encodeURI('/notes');
    let encodedUri = encodedUri1 + naamUri + encodeUri2;
    console.log(encodedUri);
    return this.http.post(encodedUri, { content: notitie , categorie: categorie});
  }

  GetNotes = (naam: string):Observable<Notities[]> => {
    let naamEncoded = encodeURIComponent(naam);
    let encodedUri = encodeURI(`https://jensjorisdecorte-backend-example-5.glitch.me/notes/?name=${naamEncoded}`);
    return this.http.get<Notities[]>(encodedUri);
  }


  //Te doen: 
  //zoek in notities van een gebruiker
 //filteren in de backend?
  searchNotes(naam:string, term: string): Observable<Notities[]> {
    if (!term.trim()) {
      return of([]);
    }    
    let naamEncoded = encodeURIComponent(naam);
    return this.http.get<Notities[]>(`https://jensjorisdecorte-backend-example-5.glitch.me/notes/?name=${naamEncoded}&zoekterm=${term}`);
  }
    

  //filter categorieën

  
  
  //Patch notitie (inhoud en/of categorie)
  //delete notitie
}
