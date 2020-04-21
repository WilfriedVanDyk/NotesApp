import { Component, OnInit, Input ,OnChanges, SimpleChanges} from '@angular/core';

import { Observable, Subject, observable, BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Notities } from '../notities';
import { APIService } from '../api.service';


@Component({
  selector: 'app-zoeken-content-notities',
  templateUrl: './zoeken-content-notities.component.html',
  styleUrls: ['./zoeken-content-notities.component.css']
})



export class ZoekenContentNotitiesComponent implements OnInit,  OnChanges {
  @Input() naamGebruiker: string;
  @Input() tabelnotities: Observable<Notities>;    //Notities[];
  displayedColumnsNotes: string[] = ["content", "categorie", "verwijderen"];//"id", ,"userId"

  notities$: Observable<Notities[]>;
  private searchTerms= new Subject<string>();
  searchTermsObservable = this.searchTerms.asObservable();

  changeLog=[];
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`\n  ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
   }

  constructor(private service: APIService) { }
  //this.notities$=this.service.GetNotes(this.naamGebruiker); } waarom is de gebruiker hier nog niet gekend???
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    // if ( this.searchTerms===null ) {      //zou moeten false geven als de searchTerms niet =""  of niet null is
      // this.notities$ = this.service.GetNotes(this.naamGebruiker);
    // }
    // else {
      this.notities$ = this.searchTermsObservable.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.service.searchNotes(this.naamGebruiker, term)),
      );
    //}
  }
deleteNotitieBoodschap:string;
boodschapObject;
  DeleteNotitie= (id:number) => {
    console.log("in de component: "+ id);
    if (window.confirm("Ben je zeker dat je deze notitie wil verwijderen?")) {
    this.service.DeleteNotitie(id).subscribe((response) => {
       console.log(response);
      // this.deleteNotitieBoodschap = JSON.stringify(response);
      // console.log("een response 1: " + this.deleteNotitieBoodschap);
      // this.boodschapObject = JSON.parse(this.deleteNotitieBoodschap);
      // console.log("een response 2: " + this.boodschapObject.succes);
      
      // if (this.boodschapObject.succes == undefined) {
      //   this.deleteNotitieBoodschap = this.boodschapObject.error;
      // } else {
      //   this.deleteNotitieBoodschap = this.boodschapObject.succes;
      // }
    });
    }
  }
}
