import {  PreorderDetailRes } from './../../models/preorderdetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-preorder-info',
  templateUrl: './preorder-info.component.html',
  styleUrls: ['./preorder-info.component.css']
})
export class PreorderInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private api: ApiService,
    ) { }

  goBack(): void {
    this.location.back();
  }

  preorder_id!: string;
  // preorderDetail: PreorderDetail[] =[];
  res?: PreorderDetailRes = undefined;


  ngOnInit(): void {
    // Access the route parameter safely
    this.route.paramMap.subscribe(params => {
      const preorder_id = params?.get('preorder_id');
      if (preorder_id !== null && preorder_id !== undefined) {
        console.log(preorder_id);
        this.preorder_id = preorder_id

        this.getDetail();
      } else {
        console.error('preorder_id is null or undefined');
      }
    });
  }

  async getDetail() {
    const body = {
     preorder_id: this.preorder_id
    }
    this.res = await this.api.getPreorderDetail(body);

    this.res.preorder_info.date = moment.utc(this.res.preorder_info.created_at).format('MM/DD/YYYY');
    console.log('>>', this.res);

    // this.preorders = await this.api.getAllLogisticsPreorders();

  }
}
