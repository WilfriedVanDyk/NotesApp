import { Component, OnInit, Input } from '@angular/core';

@Component({
selector: 'inputVoorbeeld-component',
templateUrl: './inputVoorbeeld.component.html',
styleUrls: ['./inputVoorbeeld.component.css']
})
export class InputvoorbeeldComponent implements OnInit {
    
constructor() {
}
@Input() item: string;
ngOnInit(){

}
}