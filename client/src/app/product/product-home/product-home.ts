import { Component, OnInit, WritableSignal, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { PRODUCT_DEFAULT } from '../../constants';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-product-home',
  imports: [MatCardModule, MatListModule, MatIconModule, ProductDetails],
  templateUrl: './product-home.html',
  styleUrl: './product-home.scss'
})
export class ProductHome implements OnInit {

  products: WritableSignal<Product[]> = signal<Product[]>([]);
  productInDetail: WritableSignal<Product> = signal<Product>(PRODUCT_DEFAULT);
  newProduct= signal<boolean>(false);

  constructor(public productService: ProductService) {}

ngOnInit(): void {
  this.refresh();
}

refresh(): void {
  this.productService.getAll().subscribe({
    next: (payload: Product[]) => {
      console.log(payload);
      this.products.set(payload);
    },
    error: (e: Error) => console.error(e),
    complete: () => this.selectProduct(PRODUCT_DEFAULT)
  });
}


 selectProduct(product: Product) {
  this.productInDetail.set(product);
  this.newProduct.set(false);
}

hasProductSelected(): boolean {
  return this.productInDetail() !== PRODUCT_DEFAULT || this.newProduct();
}

addNewProduct() {
  this.productInDetail.set(PRODUCT_DEFAULT);
  this.newProduct.set(true);
}

  updateProduct(product: Product) {
  this.productService.update(product).subscribe({
    next: (payload: Product) => {
      console.log(payload);
      this.productInDetail.set(payload);
    },
    error: (e: Error) => console.error(e),
      complete: () => this.refresh()
  });
}
deleteProduct(id: string) {
    this.productService.delete(id).subscribe({
    next: (payload) => console.log(`${payload} deleted`),
    error: (e: Error) => console.error(e),
    complete: () => this.refresh()
  });
}
createProduct(product: Product) {
  this.productService.create(product).subscribe({
    next: (payload: Product) => console.log(payload),
    error: (e: Error) => console.error(e),
    complete: () => this.refresh()
  });
}

saveProduct(product: Product) {
  this.newProduct() ? this.createProduct(product) : this.updateProduct(product);
}

}