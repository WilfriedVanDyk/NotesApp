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
import {ZoekenContentNotitiesComponent} from './zoeken-content-notities/zoeken-content-notities.component';
import {UpdateNotitieComponent} from './update-notitie/update-notitie.component';

@NgModule({
  declarations: [
    AppComponent,
    TabelComponent,
    TitelComponent,
    ZoekenContentNotitiesComponent,
    UpdateNotitieComponent,   
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
