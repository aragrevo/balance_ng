import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { CanActivateFn } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  const user = toSignal(authSvc.user$, {
    requireSync: true,
  });
  if (!user()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
