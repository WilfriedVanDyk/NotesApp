import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotitieComponent } from './update-notitie.component';

describe('UpdateNotitieComponent', () => {
  let component: UpdateNotitieComponent;
  let fixture: ComponentFixture<UpdateNotitieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNotitieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNotitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
