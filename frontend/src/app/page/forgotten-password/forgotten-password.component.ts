import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    this.emailDisabled = true;
    this.btnDisabled = true;
  }

}
