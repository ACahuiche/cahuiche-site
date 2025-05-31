import { Component, inject, OnInit } from '@angular/core';
import { AuthStateService } from '../../../core/states/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../../models/post.model';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { MainNavComponent } from '../../../core/components/main-nav/main-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,TruncatePipe, RouterLink, MainNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit{

  private _authState = inject(AuthStateService);
  private _blog = inject(BlogService);
  _router = inject(Router);
  userPosts: Post[] = [];

  ngOnInit(): void {
    this._blog.getPostsIndividual().subscribe(posts => {
      this.userPosts = posts.sort((a, b) => {
        const dateA = a.publishedDate?.toDate?.() ?? new Date(0);
        const dateB = b.publishedDate?.toDate?.() ?? new Date(0);
        return dateB.getTime() - dateA.getTime(); // Más nuevo primero
      });
    });
  }

  deletePost(id: string) {
    this._blog.delete(id);
  }

  logout() {
    this._authState.logOutSesion();
    this._router.navigate(['/auth/login']);
  }

  goToPublish(idPost:string) {
    this._router.navigate([`/blog/article/${idPost}`]);
  }

}
