import { Component, inject, input, OnInit } from '@angular/core';
import { AuthStateService } from '../../../core/states/auth-state.service';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export default class PostDetailComponent implements OnInit {
  authState = inject(AuthStateService);
  blogService = inject(BlogService);
  infoPost: Post;
  idPost = input.required<string>();

  ngOnInit(): void {
    if(this.idPost()) {
      this.getPost(this.idPost())
    }
  }

  async getPost(id: string){
    const postSnapshot = await this.blogService.getPost(id);

    if(!postSnapshot.exists()) return;

    const post = postSnapshot.data() as Post;

    this.infoPost = post;
  }
}
