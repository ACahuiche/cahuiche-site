import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthStateService } from '../../states/auth-state.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-main-nav',
  imports: [RouterLink],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit, OnDestroy{
  isLogged = false;
  isAdmin = false;
  userName = '';
  authState = inject(AuthStateService);
  userService = inject(UserService);
  config = inject(ConfigService);
  router = inject(Router);
  private authSub?: Subscription;
  isAllowedRegister = false;
  isAllowedLogin = false;
  
  ngOnInit(): void {
    this.authSub = this.authState.authState$.subscribe(user => {
      this.isLogged = !!user;

      if(this.isLogged) {
        this.userService.getUserData(this.authState.currentUser?.uid || '').then(userData => {
          this.userName = userData.name;
          this.isAdmin = userData.isAdmin;
        });
      }
    });

    this.config.getPermitConfig().subscribe(permits => {
      this.isAllowedLogin = permits?.['loginAccess'];
      this.isAllowedRegister = permits?.['registerAccess'];
    });

  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  goToDashboard() {
    this.router.navigateByUrl('/blog/dashboard');
  }

  goToAdminPanel() {
    this.router.navigateByUrl('/blog/admin');
  }

  goToBlog() {
    this.router.navigateByUrl('/blog');
  }

  logOut() {
    this.authState.logOutSesion();
    this.router.navigateByUrl('/blog');
  }
}
