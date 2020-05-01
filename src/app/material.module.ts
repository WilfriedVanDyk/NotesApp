import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; //wat is dit???
import { MatTableModule } from '@angular/material/table' ;
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
imports: [MatButtonModule, MatInputModule, MatTableModule, MatSelectModule, MatSortModule],
exports: [MatButtonModule, MatInputModule, MatTableModule, MatSelectModule, MatSortModule]
})

export class MaterialModule {
    
}