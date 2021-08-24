import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  email = '';
  message = 'A jelszóhelyreállító email-t sikeresen kiküldtük!<br>Ellenőrizd a postafiókod!';
  emailDisabled = false;
  btnDisabled = false;

  constructor(
    private http: HttpClient,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm): Promise<void> {
    const email = form.value.email;
    const restoreAccountUrl = `${this.adminService.apiUrl}/restoreAccount/?email=${email}`;
    await this.http.post<any>(restoreAccountUrl, {}).toPromise();
    this.emailDisabled = true;
    this.btnDisabled = true;
  }

}
