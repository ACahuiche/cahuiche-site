import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../states/auth-state.service';
import { map } from 'rxjs';

export const privateGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
  
    return authState.authState$.pipe(
      map(state => {
        if(!state) {
          router.navigateByUrl('/auth/login');
          return false;
        }
  
        return true;
      })
    );
  };

  export const publicGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
  
    return authState.authState$.pipe(
      map(state => {
        if(state) {
          router.navigateByUrl('/blog/dashboard');
          return false;
        }
  
        return true;
      })
    );
  };