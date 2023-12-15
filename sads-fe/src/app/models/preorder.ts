export interface Preorder {
    id: number;
    customer_id: number;
    preorder_number: number;
    status: string;
    user_id: number;
    permit_status: string;
    total_box: string;
    total_price: number;
    total_quantity: number;
    created_at: Date;
    updated_at: Date;
    customer_name: string;
    customer_region: string;
    customer_address: string;
    truck_id: number;
    preorder_id: number;
    loaded_date_time: Date;
    capacity: number;
    driver_name: string;
    license: string;
    date: string;
}