import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api/api.service';

export interface CartList {
  product_id: number,
  product_name: string,
  total_price: number,
  order_count: number
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  constructor(
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog,
    // public dialogRef: MatDialogRef<OrderCompleteDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) { }
  products: Product[] = [];
  cartList: CartList[] = [];

  totals = {
    total_qty: 0,
    total_amt: 0
  }

  async ngOnInit() {
    this.products = await this.api.getAllProducts();
    console.log(this.products);


    this.products = this.products.sort((a, b) => {
      return a.id - b.id;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductListComponent, {
    });
  }

  // addToCart(i: number) {
  //   const selected: CartList = {
  //     product_id: this.products[i].id,
  //     product_name: this.products[i].product_name,
  //     order_count: 0,
  //     total_price: 0
  //   }

  //   let cart_index = this.cartList.findIndex((item) => {
  //     return item.product_id == this.products[i].id
  //   });

  //   if (cart_index < 0) {
  //     console.log(this.products[i]);

  //     selected.order_count++;
  //     selected.total_price = this.products[i].product_price;
  //     this.cartList.push(selected);
  //     let last_i = this.cartList.length - 1;
  //     this.increseTotalPrice(last_i, this.cartList[last_i].order_count);
  //   } else {
  //     this.cartList[cart_index].order_count++;
  //     this.increseTotalPrice(cart_index, selected.product_id);
  //   }
  // }

  addToCart(id: number) {

    const index = this.products.findIndex((product) => {
      return product.id == id;
    });
    console.log(this.products[index]);


    const selected: CartList = {
      product_id: id,
      product_name: this.products[index].product_name,
      order_count: 0,
      total_price: 0
    }

    let cart_index = this.cartList.findIndex((item) => {
      return item.product_id == id;
    });

    if (cart_index < 0) {
      selected.order_count++;
      selected.total_price = this.products[index].product_price;

      this.cartList.push(selected);

      let last_i = this.cartList.length - 1;

      this.increseTotalPrice(last_i, this.cartList[last_i].product_id);
    } else {
      this.cartList[cart_index].order_count++;
      this.increseTotalPrice(cart_index, selected.product_id);
    }
  }

  add(cart_index: number, id: number) {
    this.cartList[cart_index].order_count++;
    this.increseTotalPrice(cart_index, id);
  }

  increseTotalPrice(cart_index: number, product_id: number) {
    let product_index = this.products.findIndex((product) => {
      return product.id == product_id;
    });

    this.cartList[cart_index].total_price = this.cartList[cart_index].order_count * this.products[product_index].product_price;
    this.calculateAllTotalPriceAndQty();
  }

  remove(cart_index: number, id: number) {
    if (this.cartList[cart_index].order_count > 1) {
      this.cartList[cart_index].order_count--;
      this.decreseTotalPrice(cart_index, id);
    } else {
      this.decreseTotalPrice(cart_index, id);
      this.cartList.splice(cart_index, 1);
    }

  }

  decreseTotalPrice(cart_index: number, product_id: number) {
    let product_index = this.products.findIndex((product) => {
      return product.id == product_id;
    });

    this.cartList[cart_index].total_price -= this.products[product_index].product_price;
    this.calculateAllTotalPriceAndQty();

  }

  calculateAllTotalPriceAndQty() {
    let total = 0;
    let qty = 0;
    this.cartList.forEach((item) => {
      total += item.total_price;
      qty += item.order_count;
    });
    this.totals.total_amt = total;
    this.totals.total_qty = qty;
  }

  delete(i: number) {
    this.cartList.splice(i, 1);
    this.calculateAllTotalPriceAndQty();
  }

  async order() {
    const preorder = {
      preorder_id: sessionStorage.getItem('preorder_id'),
      product_list: this.cartList,
      total_price: this.totals.total_amt,
      total_quantity: this.totals.total_qty,
    }
    // console.log(preorder);
    console.log(this.cartList);


    const isCreated = await this.api.createOrderList(preorder);

    if (isCreated) {
      alert("Your order is pending");

      this.router.navigateByUrl('preorder');

    }
  }

  deleteAllSelectedItems() {
    this.cartList = [];
  }

  updateTotalPriceByInputValue(str: string, i: number, id: number) {
    const product_i = this.products.findIndex((product) => {
      return product.id == id;
    });

    console.log(str);
    const qty: any = parseInt(str);

    this.cartList[i].total_price = this.products[product_i].product_price * qty;
    this.calculateAllTotalPriceAndQty();
  }
}
