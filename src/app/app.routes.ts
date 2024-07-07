import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';

export const routes: Routes = [
  { path: 'post/:slug', component: PostComponent },
  { path: 'posts', component: PostsListComponent },
];
