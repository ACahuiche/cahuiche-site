import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { MainNavComponent } from './core/components/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cahui-blog';
}
