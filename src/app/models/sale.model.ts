export interface Sale {
  id: string;
  productId: string;
  productName: string;
  productNameAr: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: Date;
  customerName?: string;
}
