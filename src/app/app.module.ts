import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {TabelComponent} from './Tabel/Tabel.component';
import {TitelComponent} from './Titel/Titel.component';


@NgModule({
  declarations: [
    AppComponent,
    TabelComponent,
    TitelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
