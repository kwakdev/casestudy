import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpApiService } from '@app/http-api.service';
import { Product } from '@app/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpApiService<Product> 
 {
  constructor(http: HttpClient) {
    super(http, 'products');
  }
}