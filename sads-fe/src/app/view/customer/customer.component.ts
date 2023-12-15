import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  cusInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  regions: string[] = ['Yangon', 'Mandalay', 'Naypyitaw'];

  async createCus() {
    console.log(this.cusInfoForm.value);
    const cus: Customer = this.cusInfoForm.value;

    console.log("cus >>", cus);

    const preorder_id = await this.api.createCustomer(cus);
    sessionStorage.setItem('preorder_id', preorder_id + '');

    this.router.navigateByUrl('order-items');

  }
}
