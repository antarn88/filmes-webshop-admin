import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { AdminService } from 'src/app/service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/model/admin';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.scss']
})
export class AdminEditorComponent implements OnInit {

  admin: Admin = new Admin();

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    const admin = await this.adminService.getOne(_id).toPromise();
    this.admin = admin;
  }

  async setAdminToDatabase(admin: Admin): Promise<void> {
    try {
      await this.adminService.update(admin).toPromise();
      this.location.back();
      this.toastr.success('Sikeresen frissítetted az admint!', 'Siker!', {
        timeOut: 3000,
      });
    } catch {
      this.toastr.error('Hiba az admin frissítésekor!', 'Hiba!', {
        timeOut: 3000,
      })
    }
  };

  backToTheAdminList(): void {
    this.location.back();
  }

}
