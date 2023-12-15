export interface FactoryPreorder {
  id:               number;
  customer_id:      number;
  preorder_number:  number;
  status:           string;
  user_id:          number;
  permit_status:    string;
  total_box:        number;
  total_price:      number;
  total_quantity:   number;
  date: string;
  created_at:       Date;
  updated_at:       Date;
  customer_name:    string;
  customer_region:  string;
  customer_address: string;
}
