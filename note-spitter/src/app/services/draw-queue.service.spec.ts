import { TestBed } from '@angular/core/testing';

import { DrawQueueService } from './draw-queue.service';

describe('DrawQueueService', () => {
  let service: DrawQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
