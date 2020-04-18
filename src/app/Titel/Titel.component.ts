import { Component, OnInit, Input } from '@angular/core';

@Component({
selector: 'Titel-component',
templateUrl: './Titel.component.html',
styleUrls: ['./Titel.component.css']
})
export class TitelComponent implements OnInit {

constructor() {
}

@Input() titelElement: string;
ngOnInit(){

}
}