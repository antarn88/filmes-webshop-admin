import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService } from 'src/app/service/config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.scss']
})
export class BillEditorComponent implements OnInit {

  bill: Bill = new Bill();

  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private toastr: ToastrService,
    private location: Location,
    private config: ConfigService
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    if (_id !== '0') {
      const bill = await this.billService.getOne(_id).toPromise();
      this.bill = bill;
    }
  }

  async setBillToDatabase(bill: Bill, form: NgForm): Promise<void> {
    if (!bill._id) {
      const _id = this.config.objectIDGenerator();
      try {
        await this.billService.create({ ...form.value, _id }).toPromise();
        this.location.back();
        this.toastr.success('Sikeresen létrehoztad a számlát!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a számla létrehozásakor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    } else {
      try {
        await this.billService.update(bill).toPromise();
        this.location.back();
        this.toastr.success('Sikeresen frissítetted a számlát!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a számla frissítésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  };

  backToTheBillList(): void {
    this.location.back();
  }

}
