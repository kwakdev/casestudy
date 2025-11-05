import { Routes } from '@angular/router';
import { Home } from '../app/home/home'
import { VendorHome } from './vendor/vendor-home/vendor-home';
import { ProductHome } from './product/product-home/product-home';
import { PurchaseOrderGenerrator } from './purchase-order/purchase-order-generrator/purchase-order-generrator';
export const routes: Routes = [
  { path: '', component: Home, },
  { path: 'vendors', component: VendorHome, },
  { path: 'products', component: ProductHome, },
  { path: 'generator', component: PurchaseOrderGenerrator, },
];