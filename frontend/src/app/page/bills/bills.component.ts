import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Bill[]> = this.billService.getAll();
  view: string = 'grid';

  constructor(
    public config: ConfigService,
    public billService: BillService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.billColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(bill: Bill): void {
  }

  // tslint:disable-next-line: no-empty
  onClickDelete(bill: Bill): void {
  }

  onClickListView(): void {
    this.view = 'list'
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onClickGridView(): void {
    this.view = 'grid';
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Fizetett: ${ConfigService.activeOrInactiveSign(value)}`;
  }

}
