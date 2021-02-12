import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSpitterComponent } from './note-spitter.component';

describe('CanvasComponent', () => {
  let component: NoteSpitterComponent;
  let fixture: ComponentFixture<NoteSpitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSpitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSpitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
