import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Bill[]> = this.billService.getAll();
  modalTitle: string = '';
  modalText: string = '';
  currentBillForDelete: Bill = new Bill();

  constructor(
    public config: ConfigService,
    public billService: BillService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.billColumns;
  }

  async deleteBillAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        await this.billService.delete(this.currentBillForDelete._id).toPromise();
        this.list$ = this.billService.getAll();
        this.toastr.success('Sikeresen törölted a számlát!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a számla törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  }

  async onClickDelete(bill: Bill): Promise<void> {
    this.modalTitle = 'Törlés';
    this.modalText = `Biztosan törölni szeretnéd a számlát?`;
    this.currentBillForDelete = bill;
  }

  onClickListView(): void {
    this.config.view = 'list'
  }

  onClickGridView(): void {
    this.config.view = 'grid';
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Fizetett: ${ConfigService.activeOrInactiveSign(value)}`;
  }

}
