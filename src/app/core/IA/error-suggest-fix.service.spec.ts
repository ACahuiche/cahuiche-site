import { TestBed } from '@angular/core/testing';

import { ErrorSuggestFixService } from './error-suggest-fix.service';

describe('ErrorSuggestFixService', () => {
  let service: ErrorSuggestFixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorSuggestFixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
