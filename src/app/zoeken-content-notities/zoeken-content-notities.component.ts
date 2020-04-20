import { Component, OnInit, Input } from '@angular/core';

import { Observable, Subject, observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

 import {Notities } from '../notities';
import { APIService } from '../api.service';
import { NgIf } from '@angular/common';




@Component({
  selector: 'app-zoeken-content-notities',
  templateUrl: './zoeken-content-notities.component.html',
  styleUrls: ['./zoeken-content-notities.component.css']
})
export class ZoekenContentNotitiesComponent implements OnInit {
  @Input() naamGebruiker:string;
  @Input() tabelnotities:Observable<Notities> ;    //Notities[];
  displayedColumnsNotes: string[] = ["content", "categorie"];//"id", ,"userId"

  notities$:Observable<Notities[]>  ;
  private searchTerms= new Subject<string>();
  searchTermsObservable = this.searchTerms.asObservable();
  searchText:string;

  //naam gebruiker is nog niet gekend in de constructor
  constructor(private service:APIService) {}//this.notities$=this.service.GetNotes(this.naamGebruiker); }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    console.log(this.searchTerms);
    console.log("gebruiker init: "+this.naamGebruiker);

// if( als de searchTerms nog niet gebruikt zijn of ="" is  ){      //zou moeten false geven als de searchTerms niet ="" is
//   this.notities$= this.service.GetNotes(this.naamGebruiker); 
// }
// else{
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.service.searchNotes(this.naamGebruiker, term)),   
      //switchMap((term: string) => this.service.GetNotes(this.naamGebruiker)), 
      //switchMap((term: string) => this.tabelnotities.     //forEach(a => a.content.includes(term)),    

    );   
//}
  }
}
