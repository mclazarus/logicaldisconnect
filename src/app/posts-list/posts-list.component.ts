import { Component, OnInit } from '@angular/core';
import { PostMetadata, PostsMetadataService } from '../posts-metadata.service';
import {DatePipe, NgForOf} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [NgForOf, RouterLink, DatePipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  posts: PostMetadata[] = [];

  constructor(private postsMetadataService: PostsMetadataService) {}

  ngOnInit() {
    this.postsMetadataService.getPostsMetadata().subscribe((data) => {
      this.posts = data;
    });
  }
}
