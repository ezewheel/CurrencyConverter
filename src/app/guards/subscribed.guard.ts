import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

export const subscribedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('role');
  if (token) return true;

  const url = router.parseUrl('');
  return new RedirectCommand(url);;
};
