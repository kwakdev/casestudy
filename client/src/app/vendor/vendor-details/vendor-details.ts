import { Component, InputSignal, OnInit, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Vendor } from '../vendor';
import { VENDOR_DEFAULT } from '../../constants';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ValidatePhone } from '../../validators/phone.validator';
import { ValidatePostal } from '../../validators/postal.validator';

@Component({
  selector: 'app-vendor-details',
  imports: [ReactiveFormsModule, MatLabel, MatFormField, MatInputModule, MatOptionModule, MatSelectModule,MatButtonModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetails implements OnInit {

  vendor: InputSignal<Vendor> = input<Vendor>(VENDOR_DEFAULT);

  saved = output<Vendor>();
  closed = output<void>();
  deleted = output<number>();

  vendorForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.compose([Validators.required])),
    address: new FormControl('', Validators.compose([Validators.required])),
    city: new FormControl('', Validators.compose([Validators.required])),
    province:new FormControl('', Validators.compose([Validators.required])),
    postalCode: new FormControl('', Validators.compose([Validators.required, ValidatePostal])),
    phone: new FormControl('', Validators.compose([Validators.required, ValidatePhone])),
    type: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  });

  ngOnInit(): void {
    this.vendorForm.setValue({
      id: this.vendor().id,
      name: this.vendor().name,
      address: this.vendor().address,
      city: this.vendor().city,
      province: this.vendor().province,
      postalCode: this.vendor().postalCode,
      phone: this.vendor().phone,
      type: this.vendor().type,
      email: this.vendor().email,
    });
  }
}
