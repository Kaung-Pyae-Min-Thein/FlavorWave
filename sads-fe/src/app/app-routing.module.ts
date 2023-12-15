import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { CustomerComponent } from './view/customer/customer.component';
import { ProductListComponent } from './view/product-list/product-list.component';
import { SalesTableComponent } from './view/sales-table/sales-table.component';
import { FactoryTableComponent } from './view/factory-table/factory-table.component';
import { WarehouseTableComponent } from './view/warehouse-table/warehouse-table.component';
import { LogisticsTableComponent } from './view/logistics-table/logistics-table.component';
import { AdminTableComponent } from './view/admin-table/admin-table.component';
import {PreorderInfoComponent} from './view/preorder-info/preorder-info.component';
import { SidenavComponent } from './view/sidenav/sidenav.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'preorder',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'preorder',
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preorder/:id',
    component: CustomerComponent,
  },
  {
    path: 'order-items',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-order/:id',
    component: ProductListComponent,
  },
  {
    path: 'sales',
    component: SalesTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'factory',
    component: FactoryTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse',
    component: WarehouseTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logistics',
    component: LogisticsTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preorderDetail/:preorder_id',
    component: PreorderInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
