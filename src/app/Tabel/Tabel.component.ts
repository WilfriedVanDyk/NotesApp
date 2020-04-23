import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Gebruiker } from '../gebruiker';
import { Notities } from '../notities';
import { Observable, Subject } from 'rxjs';


//import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'Tabel-component',
  templateUrl: './Tabel.component.html',
  styleUrls: ['./Tabel.component.css']
})
export class TabelComponent implements OnInit {

  ngOnInit() { }
  //categorieControl = new FormControl('', Validators.required);
  categorieArray: string[] = ["--","Privé", "Werk", "Vrije Tijd"];
  userList: Array<Gebruiker> = [];
  noteList: Notities[];
  displayedColumnsUsers: string[] = ["Naam", "Notitie", "ToonAlleNotities", "ButtonVerwijderAlles"]; //"Id",
  displayedColumnsNotes: string[] = ["content", "categorie", "verwijderen"];//"id", ,"userId"

  naamNotitiesOphalen: string;
  ingegevenNaamToevoegen: string;
  ingegevenNaamNotitie: string;
  notitieToevoegen: string;
  categorieToevoegen: string;
  user: string;
  boodschapNaamToevoegen: string;
  boodschapToevoegen: string;
  boodschapCategorieToevoegen: string;
  boodschapObject;
  verwijderGebruikerBoodschap: string;

  wordtNotitieToegevoegd: boolean = false;
  toonNotities: boolean = false;  
  isUserVerwijdert: boolean = false;
  addUser: boolean = false;

  constructor(private service: APIService) {
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

  AddNotitieComponent = () => {
    if (this.notitieToevoegen === undefined) {
      this.boodschapToevoegen = "u hebt niets ingevuld. ";
      return;
    }
    if (this.categorieToevoegen === undefined) {
      this.boodschapCategorieToevoegen = "categorie selecteren aub ";
      return;
    }
    console.log("velden: " + this.notitieToevoegen + " " + this.categorieToevoegen);

    this.service.AddNotitie(this.ingegevenNaamNotitie, this.notitieToevoegen, this.categorieToevoegen).subscribe((response) => {
      console.log(response);
      this.boodschapToevoegen = JSON.stringify(response);
      this.boodschapObject = JSON.parse(this.boodschapToevoegen);
      if (this.boodschapObject.success === undefined) {
        this.boodschapToevoegen = this.boodschapObject.error;
      } else {
        this.boodschapToevoegen = this.boodschapObject.success;
      }

      this.wordtNotitieToegevoegd = true;
      this.notitieToevoegen = "";
      this.categorieToevoegen = "";
      this.boodschapNaamToevoegen = "";
      this.toonNotities = false;
      this.isUserVerwijdert = false;
      this.addUser = false;

    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  GetNotesComponent = (naamAlleNotities: string) => {
    console.log("toon alle notities van:" + naamAlleNotities);
    this.service.GetNotes(naamAlleNotities).subscribe( (data) => {
      this.noteList = data;
      console.log(this.noteList);
      this.toonNotities = true;
      this.user = naamAlleNotities;    
      this.boodschapNaamToevoegen = "";
      this.wordtNotitieToegevoegd = false;
      this.isUserVerwijdert = false;
      this.ingegevenNaamNotitie = "";
      this.addUser = false;      
    });
   
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  DeleteGebruikerEnNotitieComponent = (naamVerwijderen: string) => {
    console.log("in de deletemethod!");
    if (window.confirm("Ben je zeker dat je de gebruiker wil verwijderen?")) {

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
        this.addUser = false;
        this.ingegevenNaamNotitie = "";
        this.isUserVerwijdert = true;
      });
    }
  }

}