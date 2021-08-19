import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Admin = new Admin();
  serverError: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async onLogin(form: NgForm): Promise<void> {
    try {
      await this.auth.login(form.value);
      if (this.auth.currentAdminValue) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.serverError = error.error;
      const to = setTimeout(() => {
        clearTimeout(to);
        this.serverError = '';
      }, 3000);
    };
  }

}
