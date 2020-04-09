import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Subscriber } from 'rxjs';
import { stringify } from 'querystring';
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() { }
  currentItem:string="het toegevoegde element";

}
