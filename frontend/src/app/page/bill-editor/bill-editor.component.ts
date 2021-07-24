import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

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
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    const bill = await this.billService.getOne(_id).toPromise();
    this.bill = bill;
  }

  async setBillToDatabase(bill: Bill): Promise<void> {
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
  };

  backToTheBillList(): void {
    this.location.back();
  }

}
