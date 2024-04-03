export interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  category: string;
  regular_price: number;
  offer_price: number;
  offer_status?: boolean;
  product_commission?: number;
}

export interface OrderDetails {
  order_id: string;
  products: Product[];
  total_amount: number;
  coupon_code?: string;
  discount_amount?: number;
  subtotal_amount: number;
  delivery_status: string;
}

export interface OrderRequest {
  mk_activity_key: string;
  order_details: OrderDetails;
}


// this.getCategory();
//       this.CategoryService.orderData().subscribe(data => {
//         this.orderRequest = data;
//         console.log(this.orderRequest);
//       });
