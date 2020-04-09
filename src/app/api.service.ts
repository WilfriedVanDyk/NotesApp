import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  //AFGEWERKT
  getUsers = () => {
     return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/users');   
  }

//AFGEWERKT
  AddUser = (naam:string) => {
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users');
    //return this.http.get(encodedUri);
    return this.http.post(encodedUri, {name: naam});

   // return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add?name='+naam);

  }

  //afgewerkt
 DeleteGebruikerEnNotitie = (naam:string) => {
console.log("in de service deletemethod!");
  let naamEncoded=encodeURIComponent(naam);
 let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users?name=')+naamEncoded; //kan beter met /user?name=
 console.log(encodedUri);
  return this.http.delete(encodedUri);  
  
  //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name='+naam);
}

//routing in expres...
  //routing: Route path: /users/:userId/books/:bookId
//Request URL: http://localhost:3000/users/34/books/8989
//req.params: { "userId": "34", "bookId": "8989" }


//AFGEWERKT

  AddNotitie = (naam:string, notitie:string) => {
    // let encodedUri=encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/notes');
    // return this.http.post(encodedUri, {name: naam, content:notitie});

    console.log('in de addNotitie binnen '+ naam + notitie);
    let encodedUri1=encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users/');
    let naamUri = encodeURIComponent(naam);
    let encodeUri2 = encodeURI('/notes');
    let encodedUri=encodedUri1+naamUri+encodeUri2;
    console.log(encodedUri);
    return this.http.post(encodedUri, {content:notitie});

  }

 //AFGEWERKT
//blijft een get
  GetNotes = (naam:string) => {
    let naamEncoded=encodeURIComponent(naam);
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name=')+naamEncoded;
    return this.http.get(encodedUri);
  }
}
