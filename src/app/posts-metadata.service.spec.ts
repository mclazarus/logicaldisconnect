import { TestBed } from '@angular/core/testing';

import { PostsMetadataService } from './posts-metadata.service';

describe('PostsMetadataService', () => {
  let service: PostsMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
