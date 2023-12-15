import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { FactoryPreorder } from 'src/app/models/factory';
import { Preorder } from 'src/app/models/preorder';
import { RawMaterial } from 'src/app/models/rawMaterial';
import { ApiService } from 'src/app/services/api/api.service';

const FACTORY_DATA: any[] = [
  {
    no: 1,
    date: "2023-01-01",
    item: "Tea",
    totalQty: 100,
    box: 200
  },
  {
    no: 2,
    date: "2023-02-05",
    item: "Juice",
    totalQty: 75,
    box: 500,
  },
  {
    no: 3,
    date: "2023-03-10",
    item: "Liquor",
    totalQty: 120,
    box: 3
  }
];
@Component({
  selector: 'app-factory-table',
  templateUrl: './factory-table.component.html',
  styleUrls: ['./factory-table.component.css']
})
export class FactoryTableComponent {

constructor(private api: ApiService, public dialog: MatDialog) {

}


  displayedColumns: string[] = ['id','preorder_number', 'order_date', 'totalQty', 'box','action'];
  factoryPreorder: FactoryPreorder[] = [];

  dataSource = new MatTableDataSource(this.factoryPreorder);
  materials: RawMaterial[] = [];

  async ngOnInit(){
    this.loadFactoryPreorderData();
  }

  async loadFactoryPreorderData() {
    this.factoryPreorder = await this.api.getFactoryData();
    this.dataSource = new MatTableDataSource(this.factoryPreorder);

    this.factoryPreorder.forEach((data) => {
          data.date = moment.utc(data.created_at).format('MM/DD/YYYY');
        });

        console.log(this.factoryPreorder);

  }

  async getMaterials(preorder: Preorder) {
    this.materials = await this.api.getRawMaterials({preorder_id: preorder.id});
  }

}
