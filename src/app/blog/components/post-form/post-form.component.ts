import { Component, inject, input, OnInit } from '@angular/core';
import { Post, PostForm } from '../../../models/post.model';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../../core/states/auth-state.service';
import { Timestamp } from '@angular/fire/firestore';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { MainNavComponent } from '../../../core/components/main-nav/main-nav.component';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, MainNavComponent],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export default class PostFormComponent implements OnInit {
  authState = inject(AuthStateService);
  blogService = inject(BlogService);
  router = inject(Router);

  // Se recibe por url en caso de edicion
  idPost = input.required<string>();
  title = '';
  postBody = ''
  infoPost: Post;
  isTitleError = false;
  isBodyPostError = false;

  ngOnInit(): void {
    if (this.idPost()) {
      this.getPost(this.idPost())
    }
  }

  saveAndPublish() {
    if (this.isValidForm()) {
      if (this.idPost()) {
        const data: PostForm = {
          title: this.title,
          bodyPost: this.postBody,
          isPublic: true,
          author: this.infoPost.author,
          publishedDate: this.infoPost.publishedDate,
          lastModifyDate: Timestamp.now()
        }

        this.blogService.update(this.idPost(), data);
      }
      else {
        const data: PostForm = {
          title: this.title,
          bodyPost: this.postBody,
          isPublic: true,
          publishedDate: Timestamp.now(),
          lastModifyDate: null
        }

        this.blogService.create(data);
      }

      this.router.navigateByUrl('/blog/dashboard');
    }


  }

  saveAsTemplate() {
    if (this.isValidForm()) {
      if (this.idPost()) {
        const data: PostForm = {
          title: this.title,
          bodyPost: this.postBody,
          isPublic: false,
          author: this.infoPost.author,
          publishedDate: this.infoPost.publishedDate,
          lastModifyDate: Timestamp.now()
        }

        this.blogService.update(this.idPost(), data);
      }
      else {
        const data: PostForm = {
          title: this.title,
          bodyPost: this.postBody,
          isPublic: false,
          publishedDate: Timestamp.now(),
          lastModifyDate: null
        }

        this.blogService.create(data);
      }

      this.router.navigateByUrl('/blog/dashboard');
    }
  }

  async getPost(id: string) {
    const postSnapshot = await this.blogService.getPost(id);

    if (!postSnapshot.exists()) return;

    const post = postSnapshot.data() as Post;

    this.infoPost = post;

    this.title = post.title;
    this.postBody = post.bodyPost;
  }

  isValidForm() {
    if (this.title.trim() === '') {
      this.isTitleError = true;
      return false;
    }

    if (this.postBody.trim() === '') {
      this.isBodyPostError = true;
      return false;
    }

    this.isTitleError = false;
    this.isBodyPostError = false;
    return true;

  }

}
