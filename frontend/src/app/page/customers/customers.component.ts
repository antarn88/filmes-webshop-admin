import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<Customer[]> = this.customerService.getAll();

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
  }

}
