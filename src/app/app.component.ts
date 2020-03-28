import { Component } from '@angular/core';
import { APIService } from './api.service';
import { NgModule } from '@angular/core';
import { Subscriber } from 'rxjs';
import { stringify } from 'querystring';
import { element } from 'protractor';

interface Gebruiker {
  name: string;
  id: Number;
}

interface Notities {
  id: number,
  content: string,
  userId: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'NotesApp';

  userList: Array<Gebruiker>;
  noteList: Array<Notities>;
  service: APIService;
  displayedColumnsUsers: string[] = ["Naam", "Notitie", "ToonAlleNotities", "ButtonVerwijderAlles"]; //"Id",
  displayedColumnsNotes: string[] = ["content"];//"id", ,"userId"
  naamNotitiesOphalen: string;
  ingegevenNaamToevoegen: string;
  ingegevenNaamNotitie: string;
  notitieToevoegen: string;
  wordtNotitieToegevoegd: boolean = false;
  toonNotities: boolean = false;
  user: string;
  boodschapNaamToevoegen: string;
  boodschapObject;
  verwijderGebruikerBoodschap: string;
  isUserVerwijdert: boolean=false;
  addUser:boolean=false;

  constructor(apiService: APIService) {
    this.service = apiService;
    apiService.getUsers().subscribe((data: Array<Gebruiker>) => {
      console.log(data);
      this.userList = data;
    });
  }

  UserlistRefresh = () => this.service.getUsers().subscribe((data: Array<Gebruiker>) => {
    console.log(data);
    this.userList = data;
  });

  PopUpAdduser = () => {
    this.addUser=true;
  }

  AddUserComponent = () => {
    if (this.ingegevenNaamToevoegen == undefined) {
      this.boodschapNaamToevoegen = "u hebt niets ingevuld. ";
      return;
    }

    this.service.AddUser(this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);

      this.boodschapNaamToevoegen = JSON.stringify(response);
      this.boodschapObject = JSON.parse(this.boodschapNaamToevoegen);
      if (this.boodschapObject.success == undefined) {
        this.boodschapNaamToevoegen = this.boodschapObject.error;
      } else {
        this.boodschapNaamToevoegen = this.boodschapObject.success;
      }

      this.toonNotities = false;
      this.wordtNotitieToegevoegd = false;
      this.isUserVerwijdert=false;
      this.ingegevenNaamNotitie = "";
      this.UserlistRefresh();
      this.ingegevenNaamToevoegen = "";

    });
  }

  AddNotitieComponent = () => {
    console.log("Notitie toegevoegd");
    this.service.AddNotitie(this.ingegevenNaamNotitie, this.notitieToevoegen).subscribe((response) => {
      console.log(response);
      this.wordtNotitieToegevoegd = false;
      this.notitieToevoegen = "";
      this.boodschapNaamToevoegen = "";
      this.toonNotities = false;
      this.isUserVerwijdert=false;
      this.addUser=false;
    });
  }

  AddNotitieComponentTabel = (naamNotitieToevoegen: string) => {
    console.log("addNotitieTabel: " + naamNotitieToevoegen);
    this.wordtNotitieToegevoegd = true;
    this.ingegevenNaamNotitie = naamNotitieToevoegen;
    this.toonNotities = false;
    this.isUserVerwijdert=false;
    this.addUser=false;
    this.boodschapNaamToevoegen = "";
  }


  DeleteGebruikerEnNotitieComponent = (naamVerwijderen: string) => {

    this.service.DeleteGebruikerEnNotitie(naamVerwijderen).subscribe((response) => {
      this.verwijderGebruikerBoodschap = JSON.stringify(response);
      this.boodschapObject = JSON.parse(this.verwijderGebruikerBoodschap);
      console.log("een response: " + this.boodschapObject.success);
      console.log(response);


      if (this.boodschapObject.success == undefined) {
        this.verwijderGebruikerBoodschap = this.boodschapObject.error;
      } else {
        this.verwijderGebruikerBoodschap = this.boodschapObject.success;
      }

      this.ingegevenNaamToevoegen = "",
        this.UserlistRefresh();
      this.toonNotities = false;
      this.boodschapNaamToevoegen = "";
      this.wordtNotitieToegevoegd = false;
      this.addUser=false;
      this.ingegevenNaamNotitie = "";
      this.isUserVerwijdert=true;
    });
  }



  // NoteListRefresh = (naamAlleNotities:string) => this.service.GetNotes(naamAlleNotities).subscribe((data:Array<Notities>) => {
  //     console.log(data);
  //     this.noteList=data;
  //  });

  GetNotesComponent = (naamAlleNotities: string) => {
    console.log("toon alle notities van:" + naamAlleNotities);
    this.service.GetNotes(naamAlleNotities).subscribe((data: Array<Notities>) => {
      console.log(data);
      this.noteList = data;
      this.toonNotities = true;
      this.user = naamAlleNotities;
      console.log(this.noteList);
      this.boodschapNaamToevoegen = "";
      this.wordtNotitieToegevoegd = false;
      this.isUserVerwijdert=false;
      this.ingegevenNaamNotitie = "";
    });
  }
}
