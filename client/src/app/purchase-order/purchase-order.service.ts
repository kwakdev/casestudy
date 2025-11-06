import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpApiService } from '@app/http-api.service';
import { PurchaseOrder } from './purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends HttpApiService<PurchaseOrder> {
  constructor(http: HttpClient) {
    super(http, 'purchase-orders');
  }
}