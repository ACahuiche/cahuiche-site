import { Component, inject } from '@angular/core';
import PostListComponent from '../post-list/post-list.component';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-main',
  imports: [PostListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent {
  _blog = inject(BlogService);
}
