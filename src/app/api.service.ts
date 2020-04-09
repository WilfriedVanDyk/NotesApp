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
     //return this.http.get('http://localhost:8081/users'); 
  }

//AFGEWERKT
  //is een post geworden: app.post("/users 
  AddUser = (naam:string) => {
    //replace om de witte spaties eruit te halen en er plussen van te maken
    //let naamEncoded=encodeURIComponent(naam);
    //let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/add?name=')+naamEncoded;
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/users');
    //return this.http.get(encodedUri);
    return this.http.post(encodedUri, {name: naam});

   // return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add?name='+naam);

  }

  //routing in expres...
  //routing: Route path: /users/:userId/books/:bookId
//Request URL: http://localhost:3000/users/34/books/8989
//req.params: { "userId": "34", "bookId": "8989" }

 //is een delete: Fout herkent de method delete in glitch niet
 DeleteGebruikerEnNotitie = (naam:string) => {
console.log("in de service deletemethod!");
  let naamEncoded=encodeURIComponent(naam);
  //let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name=')+naamEncoded;
 let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name=')+naamEncoded; //kan beter met /user?name=
 console.log(encodedUri);
  return this.http.get(encodedUri);  //werkt niet met delete, wel met get....
  
  //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name='+naam);
}


//AFGEWERKT
//addnote?name=Bart&content=Dit+is+een+voorbeeld+notitie 
//is ook een post: 
////////////////////////////OF TOCH BETER EEN PUT?????//////////////////////////////////
  AddNotitie = (naam:string, notitie:string) => {
    let encodedUri=encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/notes');
    return this.http.post(encodedUri, {name: naam, content:notitie});

    // let encodeUriDeel1=encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name=');
    // let naamEncoded=encodeURIComponent(naam);
    // console.log("naam: "+naamEncoded);
    // let encodeUriDeel2=encodeURI('&content=');
    // let notitieEncoded=encodeURIComponent(notitie);
    // console.log("notitieEncoded: "+notitieEncoded);
    // let encodedUri=encodeUriDeel1 + naamEncoded + encodeUriDeel2 + notitieEncoded;
    // console.log(encodedUri);

   

    //return this.http.get(encodedUri);

    //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name='+naam+'&content='+notitie);
  }

 //AFGEWERKT
//blijft een get
  GetNotes = (naam:string) => {
    let naamEncoded=encodeURIComponent(naam);
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name=')+naamEncoded;
    return this.http.get(encodedUri);

    //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name='+naam);
  }
}
