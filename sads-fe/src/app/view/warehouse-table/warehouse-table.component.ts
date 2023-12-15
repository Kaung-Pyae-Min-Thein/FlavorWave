import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Preorder } from 'src/app/models/preorder';
import { ApiService } from 'src/app/services/api/api.service';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const LOGISTIC_DATA: any[] = [
  {
    no: 1,
    date: "2023-01-01",
    preorderNo: "PO12345",
    item: "Tea",
    totalQty: 100,
    box: 200,
    status: "Pending",
  },
  {
    no: 2,
    date: "2023-02-05",
    preorderNo: "PO67890",
    item: "Juice",
    totalQty: 75,
    box: 500,
    status: "Accepted"
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },
  {
    no: 3,
    date: "2023-03-10",
    preorderNo: "PO54321",
    item: "Liquor",
    totalQty: 120,
    box: 3,
    status: "Accepted",
  },

];
@Component({
  selector: 'app-warehouse-table',
  templateUrl: './warehouse-table.component.html',
  styleUrls: ['./warehouse-table.component.css']
})
export class WarehouseTableComponent {
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }
  myLogisticData: any = [];
  displayedColumns: string[] = ['no', 'date', 'preorder_number', 'total_quantity', 'order_box', 'status'];
  preorders: Preorder[] = [];

  dataSource = new MatTableDataSource(this.preorders);
  role: string = '';

  filter: any = {
    startDate: '',
    endDate: '',
    dept: 'admin'
  }

  ngOnInit() {
    this.role = sessionStorage.getItem('role')!;
    this.loadPreorderData();
  }

  async filterByDate() {
    if (this.filter.startDate != '' && this.filter.endDate != '') {
      this.preorders = await this.api.getOrdersByCalendarCtl(this.filter);
      this.dataSource = new MatTableDataSource(this.preorders);
    }
  }

  async loadPreorderData() {
    this.preorders = await this.api.getAllWarehousePreorders();
    this.dataSource = new MatTableDataSource(this.preorders);
    this.preorders.forEach(order => {
      order.date = moment.utc(order.created_at).format('MM/DD/YYYY');
    });

    this.preorders = this.preorders.sort((a: Preorder, b: Preorder) => {
      return a.id - b.id;
    });

  }

  openStatusDialog(preorder: Preorder) {
    const dialogRef = this.dialog.open(StatusDialogComponent, { data: preorder });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPreorderData();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
