import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UpdateNotitieComponent} from './update-notitie/update-notitie.component';
import { TabelComponent } from './Tabel/Tabel.component';
import {ZoekenContentNotitiesComponent } from './zoeken-content-notities/zoeken-content-notities.component';

const routes: Routes = [
 // { path: '', redirectTo: '/Tabel', pathMatch: 'full' },
  //{path:'Tabel', component:TabelComponent},
 // { path: 'notitie/:element.id', component: UpdateNotitieComponent },
  //{path:'notities/:element.name', component:ZoekenContentNotitiesComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
