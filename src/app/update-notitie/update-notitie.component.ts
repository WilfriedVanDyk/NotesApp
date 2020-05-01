import { Component, OnInit, Input} from '@angular/core';
import { Notities } from '../notities';
import {APIService} from '../api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-update-notitie',
  templateUrl: './update-notitie.component.html',
  styleUrls: ['./update-notitie.component.css']
})
export class UpdateNotitieComponent implements OnInit {

  @Input() categorieArray: string[];
  @Input() noteToPatch:Notities;
  @Input() notities$:Observable<Notities[]>;
  @Input() naamGebruiker:string;
 

  constructor(private service:APIService) { }

  notitieAanpassen:string="";
  categorieAanpassen:string="";

  

  ngOnInit(): void {
  }

  PatchNotitieComponent = () => {
console.log("notitie in update: "+ this.noteToPatch.categorie +" "+ this.noteToPatch.content);
this.service.PatchNote(this.noteToPatch).subscribe();


  }
}
