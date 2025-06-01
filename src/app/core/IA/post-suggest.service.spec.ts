import { TestBed } from '@angular/core/testing';

import { PostSuggestService } from './post-suggest.service';

describe('PostSuggestService', () => {
  let service: PostSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSuggestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
