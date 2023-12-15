export interface Customer {
    name: string;
    address: string;
    region: string;
    phone_number: string;
}

export interface CustomerRes {
    preorder_id: number;
    customer_info: Customer;
}