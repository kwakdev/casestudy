import { Component, InputSignal, input, output, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PRODUCT_DEFAULT } from '../../constants';
import {  PurchaseOrder} from '@app/purchase-order/purchase-order'  ;
import { PurchaseOrderLineItem } from '@app/purchase-order/purchase-order-line-item'  ;
import { PurchaseOrderService } from '@app/purchase-order/purchase-order.service'  ;
import { Vendor } from '@app/vendor/vendor'  ;
import { VendorService } from '@app/vendor/vendor.service'  ;
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service'  ;
@Component({
  selector: 'app-purchase-order-generrator',
    standalone: true,

  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule,
    MatLabel, MatFormField, MatSelectModule, MatOptionModule, MatTableModule,CommonModule
  ],  templateUrl: './purchase-order-generrator.html',
  styleUrl: './purchase-order-generrator.scss'
})
export class PurchaseOrderGenerrator {

 constructor(protected vendorService: VendorService, protected productService: ProductService, protected purchaseOrderService: PurchaseOrderService
) {
  }
  reportCreatedMessage = signal<String>('');

  vendors = signal<Vendor[]>([]);
  vendorsExpenses = signal<Product[]>([]);
  tableColumns = ['id', 'quantity', 'cost'];
  reportTable = new MatTableDataSource<PurchaseOrderLineItem>();
  reportForm: FormGroup = new FormGroup({
    vendorId: new FormControl(),
    expenseId: new FormControl(),
    qoh: new FormControl(''),
  });
  selectedEmployeeId() {
    return (this.reportForm.get('vendorId')?.value ?? 0) as number;
  }

  selectedExpenseId() {
    return (this.reportForm.get('expenseId')?.value ?? 0) as string;
  }
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: e => console.error(e)
    });
  }

  onVendorSelectionChange(selection: MatSelectChange) {
    this.productService.getAllById(selection.value).subscribe({
      next: (payload: Product[]) => this.vendorsExpenses.set(payload),
      error: e => console.error(e),
    });
     this.reportForm.get('expenseId')?.setValue(0); // Unselect the expense
    this.reportTable.data = []; // Clear the table
    this.vendorsExpenses.set([]); // Clear the list of vendor expenses
    this.reportCreatedMessage.set(''); // Clear the report created message
  }
  onExpenseSelectionChange(selection: MatSelectChange) {
  const selectedProduct = this.vendorsExpenses().find(p => p.id === selection.value);
  if (selectedProduct) {
    this.reportForm.patchValue({ qoh: selectedProduct.qoh });
  } 

}
 addExpense() {
  const expense = this.vendorsExpenses().find(expense => expense.id == this.selectedExpenseId());
  const quantity = this.reportForm.get('qoh')?.value;
  
  if (expense && quantity) {
    const lineItem: PurchaseOrderLineItem = {
      id: 0, 
      poId: 0, 
      productId: expense.id,
      quantity: quantity
    };
    
    this.reportTable.data.push(lineItem);
    this.reportTable.data = this.reportTable.data;

  }
    
}
 
  expenseAlreadyAdded() {
    return this.reportTable.data.some(item => item.productId === this.selectedExpenseId());
  }

    costOfProduct(productId: string) {
    let product = this.vendorsExpenses().find(product => product.id == productId) ?? PRODUCT_DEFAULT;
    return product.cost;
  }
   taxOfProduct(productId: string) {
    let product = this.vendorsExpenses().find(product => product.id == productId) ?? PRODUCT_DEFAULT;
    return product.cost * 0.13;
  }
  totalOfProduct(productId: string) {
    let product = this.vendorsExpenses().find(product => product.id == productId) ?? PRODUCT_DEFAULT;
    let tax = product.cost * 0.13;
    return product.cost +tax;
  }

subtotalCost() {
  return this.reportTable.data.reduce((sum, item) => sum + this.costOfProduct(item.productId) , 0);
}

totalTax() {
  return this.reportTable.data.reduce((sum, item) => sum + this.taxOfProduct(item.productId), 0);
}

totalCost() {
  return this.subtotalCost() + this.totalTax();
}
  
refresh(): void {
  const vendorId = this.selectedEmployeeId();
    this.productService.getAllById(vendorId).subscribe({
      next: (payload: Product[]) => this.vendorsExpenses.set(payload),
      error: e => console.error(e)
    });
  
}
updateVendor(product: Product) {
  this.productService.update(product).subscribe({
    next: (payload: Product) => {
      console.log(payload);
    },
    error: (e: Error) => console.error(e),
      complete: () => this.refresh()
  });
}
deleteProduct(id: string) {
  this.productService.delete(id).subscribe({
    next: (payload: number) => console.log(`${payload} deleted`),
    error: (e: Error) => console.error(e),
    complete: () => this.refresh()
  });
}
saveReport() {
  let purchaseOrder: PurchaseOrder = {
    id: 0,
    vendorId: this.selectedEmployeeId(),
    items: [],
    date: ''
  };

  this.reportTable.data.forEach(lineItem => {
    purchaseOrder.items.push({
      id: 0,
      poId: 0,
      productId: lineItem.productId,
      quantity: lineItem.quantity
    })
  })

  this.purchaseOrderService.create(purchaseOrder).subscribe({
    next: (payload: PurchaseOrder) => {
      
      this.reportTable.data.forEach(lineItem => {
        const product = this.vendorsExpenses().find(p => p.id === lineItem.productId);
        if (product) {
          product.qoh -= lineItem.quantity;
          this.updateVendor(product);
        }
      });
            // Once the PurchaseOrder is created, we want to "reset" the component and display the created message

      this.reportForm.get('vendorId')?.setValue(0);
      this.reportForm.get('expenseId')?.setValue('');
      this.reportForm.get('qoh')?.setValue('');
      this.reportTable.data = [];
      this.vendorsExpenses.set([]);
      
      this.reportCreatedMessage.set(`Purchase Order #${payload.id} created at ${payload.date}`);
    },
    error: e => console.log(e)
  });
}
}

