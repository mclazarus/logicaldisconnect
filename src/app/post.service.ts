import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getMarkdownFile(slug: string): Observable<string> {
    const url = `/assets/posts/${slug}.md`;
    return this.http.get(url, { responseType: "text" });
  }
}
