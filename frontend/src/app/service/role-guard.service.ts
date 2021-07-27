import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (!this.auth.currentAdminValue ||
      (this.auth.currentAdminValue.role && Number(this.auth.currentAdminValue.role) < expectedRole)) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}