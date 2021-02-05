import { TestBed } from '@angular/core/testing';

import { NoteGeneratorService } from './note-generator.service';

describe('NoteGeneratorService', () => {
  let service: NoteGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
