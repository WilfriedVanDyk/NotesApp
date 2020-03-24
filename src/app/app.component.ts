import { Component } from '@angular/core';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NotesApp';
 
  constructor(apiService: APIService) {
    apiService.getUsers().subscribe((data) =>
    console.log(data));
    
  }
}
