import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsMetadataService {
  constructor(private http: HttpClient) {}
  getPostsMetadata(): Observable<PostMetadata[]> {
    return this.http.get<PostMetadata[]>('/assets/posts-metadata.json');
  }
}
