import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/model/admin';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  loginStatus = false;
  userSub: Subscription = new Subscription();
  admin: Admin | null = null;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentAdminSubject.subscribe(admin => this.admin = admin);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.auth.logout();
  }
}
