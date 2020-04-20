import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekenContentNotitiesComponent } from './zoeken-content-notities.component';

describe('ZoekenContentNotitiesComponent', () => {
  let component: ZoekenContentNotitiesComponent;
  let fixture: ComponentFixture<ZoekenContentNotitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoekenContentNotitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekenContentNotitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
