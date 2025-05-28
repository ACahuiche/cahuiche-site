import { Component, computed, input, signal } from '@angular/core';
import { Post } from '../../../models/post.model';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [FormsModule, TruncatePipe, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export default class PostListComponent {
  posts = input.required<Post[]>();
  searchTerm = signal<string>('');

  filteredPosts = computed(() => {
    const allPosts = this.posts() || [];
    const term = this.searchTerm().toLowerCase().trim();
  
    return allPosts
      .filter(post =>
        post.title.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        const dateA = a.publishedDate?.toDate?.() ?? new Date(0);
        const dateB = b.publishedDate?.toDate?.() ?? new Date(0);
        return dateB.getTime() - dateA.getTime(); // 🕓 Más nuevo primero
      });
  });
}
