import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { filter, map, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.isReady).pipe(
    filter(ready => ready === true),
    take(1),
    map(() => {
      if (authService.isLoggedIn()) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};