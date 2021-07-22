import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.adminColumns;
  list$: Observable<Admin[]> = this.adminService.getAll();

  constructor(
    private config: ConfigService,
    private adminService: AdminService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(admin: Admin): void {
  }

  // tslint:disable-next-line: no-empty
  onClickDelete(admin: Admin): void {
  }

}
