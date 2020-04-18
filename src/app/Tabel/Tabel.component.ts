import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import {Gebruiker} from '../gebruiker';
import {Notities} from '../notities';






@Component({
  selector: 'Tabel-component',
  templateUrl: './Tabel.component.html',
  styleUrls: ['./Tabel.component.css']
})
export class TabelComponent implements OnInit {

  ngOnInit() { }

  userList: Array<Gebruiker>=[];
  noteList: Array<Notities>=[];
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
  boodschapToevoegen: string;
  boodschapObject;
  verwijderGebruikerBoodschap: string;
  isUserVerwijdert: boolean = false;
  addUser: boolean = false;

  constructor(private  service: APIService) {
    this.service.getUsers().subscribe((data: Array<Gebruiker>) => {
      console.log(data);
      this.userList = data;
    });
  }

  UserlistRefresh = () => this.service.getUsers().subscribe((data: Array<Gebruiker>) => {
    console.log(data);
    this.userList = data;
  });

  PopUpAdduser = () => {
    this.addUser = true;
    this.wordtNotitieToegevoegd = false;
    this.toonNotities = false;
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
      this.isUserVerwijdert = false;
      this.ingegevenNaamNotitie = "";
      this.UserlistRefresh();
      this.ingegevenNaamToevoegen = "";

    });
  }

  AddNotitieComponent = () => {

    if (this.notitieToevoegen === undefined) {
      this.boodschapToevoegen = "u hebt niets ingevuld. ";
      return;
    }

    console.log("Notitie toegevoegd");
    this.service.AddNotitie(this.ingegevenNaamNotitie, this.notitieToevoegen).subscribe((response) => {
      console.log(response);
      this.boodschapToevoegen = JSON.stringify(response);
      this.boodschapObject = JSON.parse(this.boodschapToevoegen);
      if (this.boodschapObject.success == undefined) {
        this.boodschapToevoegen = this.boodschapObject.error;
      } else {
        this.boodschapToevoegen = this.boodschapObject.success;
      }

      console.log(this.notitieToevoegen + "was de notitie");
      this.wordtNotitieToegevoegd = true;
      this.notitieToevoegen = "";
      console.log(this.notitieToevoegen + "was de notitie");
      this.boodschapNaamToevoegen = "";
      this.toonNotities = false;
      this.isUserVerwijdert = false;
      this.addUser = false;

    });

  }

  AddNotitieComponentTabel = (naamNotitieToevoegen: string) => {
    console.log("addNotitieTabel: " + naamNotitieToevoegen);
    this.boodschapToevoegen = "";
    this.wordtNotitieToegevoegd = true;
    this.ingegevenNaamNotitie = naamNotitieToevoegen;
    this.toonNotities = false;
    this.isUserVerwijdert = false;
    this.addUser = false;
    this.boodschapNaamToevoegen = "";
  }


  DeleteGebruikerEnNotitieComponent = (naamVerwijderen: string) => {
    console.log("in de deletemethod!");
    if (window.confirm("Ben je zeker dat je de gebruiker wil verwijderen?")) {

      this.service.DeleteGebruikerEnNotitie(naamVerwijderen).subscribe((response) => {
        console.log("in de service component deletemethod!");
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
        this.addUser = false;
        this.ingegevenNaamNotitie = "";
        this.isUserVerwijdert = true;
      });
    }
  }

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
      this.isUserVerwijdert = false;
      this.ingegevenNaamNotitie = "";
      this.addUser = false;
    });
  }
}