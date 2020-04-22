import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core'; //

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';

import { Notities } from '../notities';
import { APIService } from '../api.service';

import { MatSort } from '@angular/material/sort';
import { getEnabledCategories } from 'trace_events';

@Component({
  selector: 'app-zoeken-content-notities',
  templateUrl: './zoeken-content-notities.component.html',
  styleUrls: ['./zoeken-content-notities.component.css']
})



export class ZoekenContentNotitiesComponent implements OnInit, OnChanges { //AfterViewInit,
  @ViewChild(MatSort) sort: MatSort;

  @Input() naamGebruiker: string;
  @Input() tabelnotities: Observable<Notities>;
  @Input() categorieArray: string[];
  categorieFilter: string;
  displayedColumnsNotes: string[] = ["content", "categorie", "verwijderen"];//"id", ,"userId"

  notities$: Observable<Notities[]>;
  private searchTerms = new BehaviorSubject<string>("");
  searchTermsObservable = this.searchTerms.asObservable();
  // private filterTerms = new BehaviorSubject<string>(this.categorieFilter);
  // filterTermsObservable = this.filterTerms.asObservable();

  ngAfterViewInit() { }
  constructor(private service: APIService) { }

  // changeLog=[];
  ngOnChanges(changes: SimpleChanges) {
    //this.filterTerms.next(this.categorieFilter);
    this.search("");
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        console.log("onchanges: " + this.naamGebruiker + " term:" + term +" categorie:"+ this.categorieFilter);
        return this.service.searchNotes(this.naamGebruiker, term,this.categorieFilter );
      })
    );
    this.search("");

    // for (let propName in changes) {
    //   let chng = changes[propName];
    //   let cur  = JSON.stringify(chng.currentValue);
    //   let prev = JSON.stringify(chng.previousValue);
    //   this.changeLog.push(`\n  ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    //}
  }
  ngOnInit(): void {
  }

  Filter = () => {
    //this.searchTerms.next(this.categorieFilter);
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        console.log("categoriefilter: " +this.naamGebruiker + " term: "+ term+ "categorie: "+ this.categorieFilter);
        //if (categorie === undefined) { categorie = ""; }  //werkt niet met categorie === undefined !!!!!!!!   waarom?   
        return this.service.searchNotes(this.naamGebruiker, term, this.categorieFilter);
      })
    );
  }




  // Push a search term into the observable stream.
  search(term: string): void {
    //console.log("zoeken in search: "+term)
    this.searchTerms.next(term);
  }

  // deleteNotitieBoodschap:string;
  // boodschapObject;
  DeleteNotitie = (id: number) => {
    console.log("in de component: " + id);
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
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        console.log("onchanges: " + this.naamGebruiker + "term:" + term);
        return this.service.searchNotes(this.naamGebruiker, term, this.categorieFilter);
      }));
  }

}
