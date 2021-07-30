import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/admin.service';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.adminColumns;
  list$: Observable<Admin[]> = this.adminService.getAll();
  modalTitle: string = '';
  modalText: string = '';
  currentAdminForDelete: Admin = new Admin();

  constructor(
    public config: ConfigService,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  async deleteAdminAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        await this.adminService.delete(this.currentAdminForDelete._id).toPromise();
        this.list$ = this.adminService.getAll();
        this.toastr.success('Sikeresen törölted az admint!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba az admin törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  }

  async onClickDelete(admin: Admin): Promise<void> {
    this.modalTitle = 'Törlés';
    this.modalText = `Biztosan törölni szeretnéd a(z) <b>${admin.email}</b> e-mail címmel rendelkező admint?`;
    this.currentAdminForDelete = admin;
  }

  onClickListView(): void {
    this.config.view = 'list'
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onClickGridView(): void {
    this.config.view = 'grid';
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Státusz: ${ConfigService.activeOrInactiveSign(value)}`;
  }

  passwordHider(password: string): string {
    return '*'.repeat(password.length);
  }

}
