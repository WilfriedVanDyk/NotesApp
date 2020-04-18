import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabelComponent } from './Tabel/Tabel.component';

//import { TitelComponent } from './Titel/Titel.component';

const routes: Routes = [
  {path:'Tabel', component:TabelComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
