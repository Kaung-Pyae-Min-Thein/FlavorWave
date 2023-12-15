export interface PreorderDetailRes {
  status:             string;
  preorder_info:      PreorderInfo;
  customer_info:      CustomerInfo;
  preorder_item_list: PreorderItemList[];
}

export interface CustomerInfo {
  id:           number;
  name:         string;
  region:       string;
  address:      string;
  phone_number: string;
  created_at:   Date;
  updated_at:   Date;
}

export interface PreorderInfo {
  id:              number;
  customer_id:     number;
  preorder_number: number;
  status:          string;
  user_id:         number;
  permit_status:   string;
  total_box:       number;
  total_price:     number;
  total_quantity:  number;
  date: string;
  created_at:      Date;
  updated_at:      Date;
}

export interface PreorderItemList {
  id:           number;
  preorder_id:  number;
  product_id:   number;
  product_name: string;
  order_count:  number;
  boxes:        number;
  user_id:      number;
  created_at:   Date;
  updated_at:   Date;
}
