import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export interface PurchaseOrder {
  id: number,
  vendorId: number,
  items: PurchaseOrderLineItem[],
  date: string
}