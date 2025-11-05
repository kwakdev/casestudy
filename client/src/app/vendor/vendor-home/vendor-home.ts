import { Component, OnInit, WritableSignal, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
import { VendorDetails } from '../vendor-details/vendor-details';
import { VENDOR_DEFAULT } from '../../constants';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vendor-home',
  imports: [MatCardModule, MatListModule, VendorDetails,MatIconModule],
  templateUrl: './vendor-home.html',
  styleUrl: './vendor-home.scss'
})
export class VendorHome implements OnInit {

  vendors: WritableSignal<Vendor[]> = signal<Vendor[]>([]);
  vendorInDetail: WritableSignal<Vendor> = signal<Vendor>(VENDOR_DEFAULT);
  newVendor= signal<boolean>(false);

  constructor(public vendorService: VendorService) {}

ngOnInit(): void {
  this.refresh();
}

refresh(): void {
  this.vendorService.getAll().subscribe({
    next: (payload: Vendor[]) => {
      console.log(payload);
      this.vendors.set(payload);
    },
    error: (e: Error) => console.error(e),
    complete: () => this.selectVendor(VENDOR_DEFAULT)
  });
}


 selectVendor(vendor: Vendor) {
  this.vendorInDetail.set(vendor);
  this.newVendor.set(false);
}

hasVendorSelected(): boolean {
  return this.vendorInDetail().id > 0 || this.newVendor();
}

addNewVendor() {
  this.vendorInDetail.set(VENDOR_DEFAULT);
  this.newVendor.set(true);
}

  updateVendor(vendor: Vendor) {
  this.vendorService.update(vendor).subscribe({
    next: (payload: Vendor) => {
      console.log(payload);
      this.vendorInDetail.set(payload);
    },
    error: (e: Error) => console.error(e),
      complete: () => this.refresh()
  });
}
deleteVendor(id: number) {
    this.vendorService.delete(id.toString()).subscribe({
    next: (payload: number) => console.log(`${payload} deleted`),
    error: (e: Error) => console.error(e),
    complete: () => this.refresh()
  });
}
createVendor(vendor: Vendor) {
  this.vendorService.create(vendor).subscribe({
    next: (payload: Vendor) => console.log(payload),
    error: (e: Error) => console.error(e),
    complete: () => this.refresh()
  });
}

saveVendor(vendor: Vendor) {
  this.newVendor() ? this.createVendor(vendor) : this.updateVendor(vendor);
}

}