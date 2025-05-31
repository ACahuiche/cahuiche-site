import { Component, inject } from '@angular/core';
import PostListComponent from '../post-list/post-list.component';
import { BlogService } from '../../services/blog.service';
import { MainNavComponent } from '../../../core/components/main-nav/main-nav.component';

@Component({
  selector: 'app-main',
  imports: [PostListComponent, MainNavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent {
  _blog = inject(BlogService);
}
