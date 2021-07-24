import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    const customer = await this.customerService.getOne(_id).toPromise();
    this.customer = customer;
  }

  async setCustomerToDatabase(customer: Customer): Promise<void> {
    try {
      await this.customerService.update(customer).toPromise();
      this.location.back();
      this.toastr.success('Sikeresen frissítetted a vásárlót!', 'Siker!', {
        timeOut: 3000,
      });
    } catch {
      this.toastr.error('Hiba a vásárló frissítésekor!', 'Hiba!', {
        timeOut: 3000,
      })
    }
  };

  backToTheCustomerList(): void {
    this.location.back();
  }

}
