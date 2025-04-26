import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../core/states/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  logout() {
    this._authState.logOutSesion();
    this._router.navigate(['/auth/login']);
  }

}
