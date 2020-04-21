import { Component, OnInit, Input ,AfterViewInit, OnChanges, SimpleChanges,  } from '@angular/core'; //ViewChild

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';

import { Notities } from '../notities';
import { APIService } from '../api.service';
//import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-zoeken-content-notities',
  templateUrl: './zoeken-content-notities.component.html',
  styleUrls: ['./zoeken-content-notities.component.css']
})



export class ZoekenContentNotitiesComponent implements OnInit, OnChanges { //AfterViewInit,
  @Input() naamGebruiker: string;
  @Input() tabelnotities: Observable<Notities>;
  @Input() categorieArray:string[];

  //@ViewChild(MatSort, {static: true}) sort: MatSort;
  
  categorieFilter:string;
  displayedColumnsNotes: string[] = ["content", "categorie", "verwijderen"];//"id", ,"userId"

  notities$: Observable<Notities[]>;
  private searchTerms= new BehaviorSubject<string>("");
 // private searchTerms= new Subject<string>();
  searchTermsObservable = this.searchTerms.asObservable();
filterBoolean:boolean=true;
  

// ngAfterViewInit(){
// 
// }
constructor(private service: APIService) { }

  //changeLog=[];
  ngOnChanges(changes: SimpleChanges) {
    this.notities$ = this.searchTermsObservable.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
       return this.service.searchNotes(this.naamGebruiker, term)})
    );
    this.search("");   
  
    // for (let propName in changes) {
    //   let chng = changes[propName];
    //   let cur  = JSON.stringify(chng.currentValue);
    //   let prev = JSON.stringify(chng.previousValue);
    //   this.changeLog.push(`\n  ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
   }
   ngOnInit(): void {
     
     
    }


  
  // Push a search term into the observable stream.
  search(term: string): void {
    //console.log("zoeken: "+term)
    this.searchTerms.next(term);
  }


 

// deleteNotitieBoodschap:string;
// boodschapObject;
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

   Filter = () => {
      console.log("categorie: "+this.categorieFilter);
    //   if(this.filterBoolean===true){
    //   this.filterBoolean=false;
    // }else this.filterBoolean=true;
   // return this.notities$.pipe(map(items => items.filter(item => item.categorie===this.categorieFilter))); //categorie
    
    
  }
}
