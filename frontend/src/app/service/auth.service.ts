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

  loginUrl: string = 'http://localhost:3000/api/login';
  logoutUrl: string = 'http://localhost:3000/api/logout';
  currentAdminSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  lastSessionId: string = '';
  lastToken: string = '';
  storageName: string = 'currentAdmin';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private http: HttpClient
  ) {
    if (localStorage.currentAdmin) {
      const admin: Admin = JSON.parse(localStorage.currentAdmin);
      this.lastToken = admin.token || '';
      this.currentAdminSubject.next(admin);
    }
  }

  get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
  }

  async login(loginData: Admin): Promise<Observable<{ _id: string, accessToken: string; }>> {
    let admin: Admin = new Admin();
    let response: { _id: string, accessToken: string; } = { _id: '', accessToken: '' };

    response = await this.http.post<{ _id: string, accessToken: string; }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    ).toPromise();

    if (response._id && response.accessToken) {
      this.lastSessionId = response._id;
      this.lastToken = response.accessToken;
      admin = await this.adminService.findByEmail(loginData.email, this.lastToken, this.lastSessionId).toPromise();

      if (admin) {
        admin.sessionId = this.lastSessionId;
        admin.token = this.lastToken;
        localStorage.setItem(this.storageName, JSON.stringify(admin));
        this.currentAdminSubject.next(admin);
      } else {
        localStorage.removeItem(this.storageName);
        this.currentAdminSubject.next(new Admin());
      }

      return of(response);
    }
    return of({ _id: '', accessToken: '' });
  }

  async logout(ignoreHttp: boolean = false): Promise<void> {
    if (!ignoreHttp) {
      // Delete session from database
      const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin')!);
      await this.http.post<{}>(this.logoutUrl, { sessionId: currentAdmin.sessionId, token: currentAdmin.token }).toPromise();
    }

    this.lastToken = '';
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
    this.router.navigate(['login']);
  }
}
