import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { PostService } from '../post.service';
import * as marked from 'marked';
import frontMatter from 'front-matter';
import { ChangeDetectorRef } from '@angular/core';
import {DatePipe} from "@angular/common";

interface PostMetadata {
  id: string;
  slug: string;
  title: string;
  date: Date;
  tags: string[];
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  markdownContent: SafeHtml | undefined;
  post: PostMetadata | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
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
      const { body, attributes } = this.preProcess(data);
      const rawMarkdown = marked.parse(body);
      this.post = attributes as unknown as PostMetadata;
      if (typeof rawMarkdown === 'string') {
        this.markdownContent = rawMarkdown;
        this.cdr.detectChanges();  // Manually trigger change detection
      }
    });
  }
  // TODO do stuff with the front-matter header
  preProcess(markdown: string) {
    const { attributes, body } = frontMatter(markdown);
    return { attributes, body };
  }
}
