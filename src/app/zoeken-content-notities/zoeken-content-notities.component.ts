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
  categorieFilter: string="--";
  displayedColumnsNotes: string[] = ["content", "categorie","patch", "verwijderen"];//"id", ,"userId"

  notities$: Observable<Notities[]>;
  private searchTerms = new BehaviorSubject<string>("");
  searchTermsObservable = this.searchTerms.asObservable();
  verwijderen:string="verwijderen";
  update:string="update";
  updateBool:boolean=false;

  ngAfterViewInit() { }
  constructor(private service: APIService) { }

 
  ngOnChanges(changes: SimpleChanges) {
    this.updateBool=false;
    this.search("");
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.service.searchNotes(this.naamGebruiker, term,this.categorieFilter );
      })
    );
    this.search("");
  }
  ngOnInit(): void {
  }

  noteToPatch:Notities;
  
  Update = (id:number) => {
    console.log("in de update method");
    this.updateBool=true;
    this.service.GetOneNote(id).subscribe((data) => {
       this.noteToPatch = data;
    });                
  }


  Filter = () => {
    //this.searchTerms.next(this.categorieFilter);
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        //console.log("categoriefilter: " +this.naamGebruiker + " term: "+ term+ "categorie: "+ this.categorieFilter);
        //if (this.categorieFilter === undefined) { this.categorieFilter = ""; }  //werkt niet met categorie === undefined !!!!!!!!   waarom?   
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
   // console.log("in de component: " + id);
    if (window.confirm("Ben je zeker dat je deze notitie wil verwijderen?")) {
      this.service.DeleteNotitie(id).subscribe((response) => {
        console.log(response);
      });
    }
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
      //  console.log("onchanges: " + this.naamGebruiker + "term:" + term);
        return this.service.searchNotes(this.naamGebruiker, term, this.categorieFilter);
      }));
  }

}
