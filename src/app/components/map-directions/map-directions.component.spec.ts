import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDirectionsComponent } from './map-directions.component';

describe('MapDirectionsComponent', () => {
  let component: MapDirectionsComponent;
  let fixture: ComponentFixture<MapDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDirectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
