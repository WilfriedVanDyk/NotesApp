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
  displayedColumnsUsers: string[] = ["Id", "Naam", "Notitie", "ToonAlleNotities", "ButtonVerwijderAlles"]; //"Notitie",
  displayedColumnsNotes: string[] = ["id","content","userId"];
  naamNotitiesOphalen: string;
  ingegevenNaamToevoegen: string;
  ingegevenNaamNotitie: string;
  notitieToevoegen: string;
  wordtNotitieToegevoegd: boolean = false;
 toonNotities:boolean=false;

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

  //NoteListRefresh = () => this.service.

  AddUserComponent = () => {
    // console.log("wat is dat hier?");
    this.service.AddUser(this.ingegevenNaamToevoegen).subscribe((response) => {
      console.log(response);
      this.toonNotities=false;
      //if response .error en dit weergeven in de browser
      this.UserlistRefresh();
    });
  }

  AddNotitieComponent = () => {
    console.log("Notitie toegevoegd");
    this.service.AddNotitie(this.ingegevenNaamNotitie, this.notitieToevoegen).subscribe((response) => {
      console.log(response);
      this.wordtNotitieToegevoegd = false;
      this.notitieToevoegen = "";
      this.toonNotities=false;
    });
  }

  AddNotitieComponentTabel = (naamNotitieToevoegen: string) => {
    console.log("addNotitieTabel: " + naamNotitieToevoegen);
    this.wordtNotitieToegevoegd = true;
    this.ingegevenNaamNotitie = naamNotitieToevoegen;
    this.toonNotities=false;
  }


  DeleteGebruikerEnNotitieComponent = (naamVerwijderen: string) => {
    console.log("verwijder gebruiker:" + naamVerwijderen);
    this.service.DeleteGebruikerEnNotitie(naamVerwijderen).subscribe((response) => {
      console.log(response);
      this.UserlistRefresh();
      this.toonNotities=false;

    });
  }

  

  // NoteListRefresh = (naamAlleNotities:string) => this.service.GetNotes(naamAlleNotities).subscribe((data:Array<Notities>) => {
  //     console.log(data);
  //     this.noteList=data;
  //  });

  GetNotesComponent = (naamAlleNotities: string) => {
    console.log("toon alle notities van:" + naamAlleNotities);
    this.service.GetNotes(naamAlleNotities).subscribe((data:Array<Notities>) => {
      console.log(data);
      this.noteList=data;
      this.toonNotities=true;
     console.log(this.noteList);
    });

  }


}
