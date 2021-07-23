import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Customer[]> = this.customerService.getAll();

  constructor(
    public config: ConfigService,
    public customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.customerColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(customer: Customer): void {
  }

  // tslint:disable-next-line: no-empty
  onClickDelete(customer: Customer): void {
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
    return `Státusz: ${ConfigService.activeOrInactiveSign(value)}`;
  }

}
