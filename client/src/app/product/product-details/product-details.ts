import { Component, InputSignal, input, output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';

import { Product } from '../product';
import { PRODUCT_DEFAULT } from '../../constants';
import { StickyOffset } from '@angular/cdk/table';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatAccordion,MatLabel, MatInputModule, MatButtonModule, MatExpansionModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {
  product: InputSignal<Product> = input<Product>(PRODUCT_DEFAULT);

  saved = output<Product>();
  closed = output<void>();
  deleted = output<string>();

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
   vendorId: new FormControl('', Validators.compose([Validators.min(1)])),
    name: new FormControl('', Validators.compose([Validators.required])),
    cost: new FormControl('', Validators.compose([Validators.min(1)])),
    msrp: new FormControl('', Validators.compose([Validators.min(1)])),
    rop: new FormControl('', Validators.compose([Validators.min(0)])),
    eoq: new FormControl('', Validators.compose([Validators.min(0)])),
    qoh: new FormControl('', Validators.compose([Validators.min(0)])),
    qoo: new FormControl('', Validators.compose([Validators.min(0)])),
  });

  ngOnInit(): void {
    this.productForm.setValue({
      id: this.product().id,
      vendorId: this.product().vendorId,
      name: this.product().name,
      cost: this.product().cost,
      msrp: this.product().msrp,
      rop: this.product().rop,
      eoq: this.product().eoq,
      qoh: this.product().qoh,
      qoo: this.product().qoo,
    });
  }
}
