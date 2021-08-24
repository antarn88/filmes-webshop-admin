import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/service/admin.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-restore-account',
  templateUrl: './restore-account.component.html',
  styleUrls: ['./restore-account.component.scss']
})
export class RestoreAccountComponent implements OnInit {

  email = '';
  token = '';
  lastTokenObject: { token: string; } = { token: '' };
  error = new BehaviorSubject({ hasError: false, message: '' });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: AdminService,
    private auth: AuthService,
    private toastr: ToastrService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(
      params => {
        this.email = params.email,
          this.token = params.token;
      }
    );
    const lastTokenObjectUrl = `${this.adminService.apiUrl}/restoreAccount/lastToken?email=${this.email}`;
    this.lastTokenObject = await this.http.get<any>(lastTokenObjectUrl).toPromise();
    this.checkTokens();
  }

  async checkTokens(): Promise<boolean> {
    if (!this.email || !this.token) {
      this.error.next({ hasError: true, message: 'Hibás jelszóhelyreállítási link!' });
      return false;
    }

    if (this.lastTokenObject) {
      const result = await bcrypt.compare(this.token, this.lastTokenObject.token);
      if (result) {
        return true;
      } else {
        this.error.next({ hasError: true, message: 'Érvénytelen vagy lejárt jelszóhelyreállítási link!' });
        return false;
      }
    } else {
      this.error.next({ hasError: true, message: 'Érvénytelen vagy lejárt jelszóhelyreállítási link!' });
      return false;
    }
  }
  
  async setNewPassword(password: string): Promise<void> {
    const loginUrl = `${this.adminService.apiUrl}/login`;
    const logoutUrl = `${this.adminService.apiUrl}/logout`;
    const loginData = await this.http.post<any>(loginUrl, { email: 'rendszergazda@kft.hu', password: 'admin' }).toPromise();
    const admin = await this.adminService.findByEmail(this.email, loginData.accessToken, loginData._id).toPromise();

    await this.adminService.update({ ...admin, password }, 
      { 'headers': { 'Authorization': `Bearer ${loginData.accessToken}`, 'sessionId': loginData._id } 
    }).toPromise();

    await this.http.post<{}>(logoutUrl, { sessionId: loginData._id, token: loginData.accessToken }).toPromise();
  }
  
  async onSubmit(form: NgForm): Promise<void> {
    try {
      await this.setNewPassword(form.value.password1);
      const deleteAllRequestByEmailUrl = `${this.adminService.apiUrl}/restoreAccount/?email=${this.email}`;
      await this.http.delete<any>(deleteAllRequestByEmailUrl).toPromise();
      await this.auth.logout(true);
      this.toastr.success('Sikeresen módosítottad a jelszavad!', 'Siker!', {
        timeOut: 5000,
      });
    } catch (error) {
      this.toastr.error('Nem sikerült a jelszavad módosítása!', 'Hiba!', {
        timeOut: 5000,
      });
    }
  }
}
