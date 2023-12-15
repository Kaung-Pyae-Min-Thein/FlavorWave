import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Preorder } from 'src/app/models/preorder';
import { ApiService } from 'src/app/services/api/api.service';


const ADMIN_DATA: any[] = [
  {
    no: 1,
    date: "2023-01-01",
    customerName: "John Doe",
    preorderNo: "PO12345",
    region: "North",
    totalQty: 100,
    totalAmount: 500
  },
  {
    no: 2,
    date: "2023-02-05",
    customerName: "Rosey",
    preorderNo: "PO67890",
    region: "South",
    totalQty: 75,
    totalAmount: 500
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  }
  ,
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "David",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 230
  }
];
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent {
  constructor(
    private api: ApiService,
  ) { }
  myAdminData: any = [];
  displayedColumns: string[] = ['no', 'date', 'customer_name', 'preorder_number', 'customer_region', 'total_quantity', 'total_price', 'status']

  preorders: Preorder[] = [];
  dataSource = new MatTableDataSource(this.preorders);
  totals: any = {
    total_price: 0,
    total_qty: 0
  }
  filter: any = {
    startDate: '',
    endDate: '',
    dept: 'admin'
  }

  ngOnInit() {
    this.loadPreorderData();
  }

  async filterByDate() {
    if (this.filter.startDate != '' && this.filter.endDate != '') {
      this.preorders = await this.api.getOrdersByCalendarCtl(this.filter);

      this.preorders.forEach(order => {
        order.date = moment.utc(order.created_at).format('MM/DD/YYYY')
      });
      this.dataSource = new MatTableDataSource(this.preorders);
    }
    this.updateTotalPriceAndQty();
  }

  async loadPreorderData() {
    this.preorders = await this.api.getAllPreorders();
    this.dataSource = new MatTableDataSource(this.preorders);
    this.preorders.forEach(order => {
      order.date = moment.utc(order.created_at).format('MM/DD/YYYY');
    });

    this.preorders = this.preorders.sort((a: Preorder, b: Preorder) => {
      return a.id - b.id;
    });

    this.updateTotalPriceAndQty();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  updateTotalPriceAndQty() {
    let price = 0;
    let qty = 0;
    this.preorders.forEach(order => {
      price += order.total_price;
      qty += order.total_quantity;
    });
    this.totals.total_price = price;
    this.totals.total_qty = qty;
  }
  getTotalQty() { return ADMIN_DATA.map((t: any) => t.totalQty).reduce((acc: any, value: any) => acc + value, 0); }

}
