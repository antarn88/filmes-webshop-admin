import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  admins$: Observable<Admin[]> = this.adminService.getAll();

  constructor(
    private adminService: AdminService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  passwordToStars(password: string): string {
    return '*'.repeat(password.length);
  }

}
