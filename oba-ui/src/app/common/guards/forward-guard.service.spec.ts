import { TestBed } from '@angular/core/testing';

import { ForwardGuard } from './forward-guard.service';

describe('ForwardGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForwardGuard = TestBed.get(ForwardGuard);
    expect(service).toBeTruthy();
  });
});
