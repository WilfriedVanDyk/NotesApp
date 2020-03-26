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

  constructor(apiService: APIService) {
    apiService.getUsers().subscribe((data:Array<Gebruiker>) => {
      console.log(data);
      this.userList=data;
    })
  }
  
  displayedColumns: string[] = ["id", "name"];
  dataSource = this.userList;
}
