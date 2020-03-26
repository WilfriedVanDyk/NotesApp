import { Component } from '@angular/core';
import { APIService } from './api.service';


interface Gebruiker{
 
  name:string;
  id:Number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'NotesApp';

userList: Array<Gebruiker>;
service: APIService;
displayedColumns: string[] = ["Id", "Naam"];
dataSource = this.userList;
ingegevenNaam:string;
  constructor(apiService: APIService) {
    this.service=apiService;
    apiService.getUsers().subscribe((data:Array<Gebruiker>) => {
      //console.log(data);
      this.userList=data;
    });
  }


  //welke parameters moet ik hier ingeven????
  AddUserComponent = () => {
    this.service.AddUser().subscribe(name);
    
  }
 
  
 
}
