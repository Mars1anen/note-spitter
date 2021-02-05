import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasZoneComponent } from './canvas-zone.component';

describe('CanvasZoneComponent', () => {
  let component: CanvasZoneComponent;
  let fixture: ComponentFixture<CanvasZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
