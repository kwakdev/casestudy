import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel, MatFormField } from '@angular/material/form-field';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { Vendor } from '@app/vendor/vendor'  ;
import { VendorService } from '@app/vendor/vendor.service'  ;
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service'  ;
@Component({
  selector: 'app-purchase-order-generrator',
    standalone: true,

  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule,
    MatLabel, MatFormField, MatSelectModule, MatOptionModule,
  ],  templateUrl: './purchase-order-generrator.html',
  styleUrl: './purchase-order-generrator.scss'
})
export class PurchaseOrderGenerrator {

 constructor(protected vendorService: VendorService, protected productService: ProductService) {
  }

  vendors = signal<Vendor[]>([]);
  vendorsExpenses = signal<Product[]>([]);

  reportForm: FormGroup = new FormGroup({
    productId: new FormControl(),
  });

  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts() {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: e => console.log(e)
    });
  }

  onVendorSelectionChange(selection: MatSelectChange) {
   this.productService.getAllById(selection.value).subscribe({
      next: (payload: Product[]) => this.vendorsExpenses.set(payload),
      error: e => console.log(e),
    });
  }



}
