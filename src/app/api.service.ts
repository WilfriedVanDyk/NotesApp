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
    let naamEncoded=encodeURIComponent(naam);
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/add?name=')+naamEncoded;
    return this.http.get(encodedUri);

   // return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/add?name='+naam);

  }
//addnote?name=Bart&content=Dit+is+een+voorbeeld+notitie 
  AddNotitie = (naam:string, notitie:string) => {
    
    
    
    let encodeUriDeel1=encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name=');
    let naamEncoded=encodeURIComponent(naam);
    console.log("naam: "+naamEncoded);

    let encodeUriDeel2=encodeURI('&content=');
    let notitieEncoded=encodeURIComponent(notitie);
    console.log("notitieEncoded: "+notitieEncoded);

    let encodedUri=encodeUriDeel1 + naamEncoded + encodeUriDeel2 + notitieEncoded;
    console.log(encodedUri)
    return this.http.get(encodedUri);

    //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/addnote?name='+naam+'&content='+notitie);
  }

  DeleteGebruikerEnNotitie = (naam:string) => {
    let naamEncoded=encodeURIComponent(naam);
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name=')+naamEncoded;
    return this.http.get(encodedUri);
    
    //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/remove?name='+naam);
  }

  GetNotes = (naam:string) => {

    let naamEncoded=encodeURIComponent(naam);
    let encodedUri= encodeURI('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name=')+naamEncoded;
    return this.http.get(encodedUri);

    //return this.http.get('https://jensjorisdecorte-backend-example-5.glitch.me/notes?name='+naam);
  }
}
