import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PermitDialogComponent } from '../permit-dialog/permit-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { Preorder } from 'src/app/models/preorder';
import * as moment from 'moment';

const SALES_DATA: any[] = [
  {
    no: 1,
    date: "2023-01-01",
    customerName: "John Doe",
    preorderNo: "PO12345",
    region: "North",
    totalQty: 100,
    totalAmount: 1500.00,
    status: "Pending",
    transportPermit: "Pending"
  },
  {
    no: 2,
    date: "2023-02-05",
    customerName: "Jane Smith",
    preorderNo: "PO67890",
    region: "South",
    totalQty: 75,
    totalAmount: 1200.50,
    status: "Accepted",
    transportPermit: "Accepted"
  },
  {
    no: 3,
    date: "2023-03-10",
    customerName: "Bob Johnson",
    preorderNo: "PO54321",
    region: "West",
    totalQty: 120,
    totalAmount: 2000.75,
    status: "Accepted",
    transportPermit: "Requested"
  }
];
@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {

  mySalesData: any = [];
  preorders: Preorder[] = [];
  displayedColumns: string[] = ['no', 'date', 'customer_name', 'preorder_number', 'customer_region', 'total_quantity', 'total_price', 'status', 'permit_status'];

  // dataSource = new MatTableDataSource(SALES_DATA);
  dataSource = new MatTableDataSource(this.preorders);
  role: string = '';

  filter: any = {
    startDate: '',
    endDate: '',
    dept: 'admin'
  }

  constructor(
    private api: ApiService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role')!;
    this.loadPreorderData();
  }

  async filterByDate() {
    if (this.filter.startDate != '' && this.filter.endDate != '') {
      this.preorders = await this.api.getOrdersByCalendarCtl(this.filter);
      this.dataSource = new MatTableDataSource(this.preorders);
      console.log(this.preorders);

    }
  }

  async loadPreorderData() {
    this.preorders = await this.api.getAllPreorders();
    console.log(this.preorders);

    this.preorders.forEach(order => {
      order.created_at = new Date(order.created_at);
      order.date = moment.utc(order.created_at).format('MM/DD/YYYY');
    });
    this.dataSource = new MatTableDataSource(this.preorders);

    this.preorders = this.preorders.sort((a: Preorder, b: Preorder) => {
      return a.id - b.id;
    });
  }

  getRowData(row: Preorder, evt: any): void {
    console.log(row, evt);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  openPermitDialog(preorder: Preorder) {
    const dialogRef = this.dialog.open(PermitDialogComponent, { data: preorder });
    dialogRef.afterClosed().subscribe(result => {
      this.loadPreorderData();
    });
  }

  openStatusDialog(preorder: Preorder) {
    const dialogRef = this.dialog.open(StatusDialogComponent, { data: preorder });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPreorderData();
    });
  }
}
