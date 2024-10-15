import { TestBed } from '@angular/core/testing';

import { WebPostsAPIService } from './data-service.service';

describe('DataServiceService', () => {
  let service: WebPostsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPostsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
