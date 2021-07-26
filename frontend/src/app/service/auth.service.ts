import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Admin } from '../model/admin';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = 'http://localhost:3000/login';
  logoutUrl: string = 'http://localhost:3000/logout';
  currentAdminSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  lastToken: string = '';
  storageName: string = 'currentAdmin';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private http: HttpClient
  ) { }

  get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
  }

  async login(loginData: Admin): Promise<Observable<{ accessToken: string; }>> {
    let admins: Admin | Admin[] = [];
    let response: { accessToken: string; } = { accessToken: '' };

    response = await this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    ).toPromise();

    if (response.accessToken) {
      this.lastToken = response.accessToken;
      admins = await this.adminService.query(`email=${loginData.email}`).toPromise();

      if (admins && Array.isArray(admins)) {
        admins[0].token = this.lastToken;
        localStorage.setItem(this.storageName, JSON.stringify(admins[0]));
        this.currentAdminSubject.next(admins[0]);
      } else {
        localStorage.removeItem(this.storageName);
        this.currentAdminSubject.next(new Admin());
      }

      return of(response);
    }
    return of({ accessToken: '' });
  }

  logout() {
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
    this.router.navigate(['login']);
  }
}
