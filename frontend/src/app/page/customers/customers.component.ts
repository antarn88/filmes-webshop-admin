import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.customerColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(customer: Customer): void {
  }

  async onClickDelete(customer: Customer): Promise<void> {
    if (confirm(`Biztosan törölni szeretnéd a vásárlót?`)) {
      try {
        await this.customerService.delete(customer._id).toPromise();
        this.list$ = this.customerService.getAll();
        this.toastr.success('Sikeresen törölted a vásárlót!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a vásárló törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
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
