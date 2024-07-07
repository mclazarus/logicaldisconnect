import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import * as marked from 'marked';
import matter from 'gray-matter';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  markdownContent: SafeHtml | undefined;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  loadPost(slug: string) {
    this.postService.getMarkdownFile(slug).subscribe((data) => {
      const body = this.preProcess(data);
      const rawMarkdown = marked.parse(body);
      if (typeof rawMarkdown === 'string') {
        this.markdownContent =
          this.sanitizer.bypassSecurityTrustHtml(rawMarkdown);
      }
    });
  }

  // TODO do stuff with the front-matter header
  preProcess(markdown: string) {
    const { content } = matter(markdown);
    return content;
  }
}
