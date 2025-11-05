import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '@app/vendor/vendor';

import { HttpApiService } from '@app/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends HttpApiService<Vendor> {
  constructor(http: HttpClient) {
    super(http, 'vendors');
  }
}