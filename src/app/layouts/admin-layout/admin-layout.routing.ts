import { Routes } from '@angular/router';

import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { UserProfileComponent } from '../../modules/user-profile/user-profile.component';
import { TableListComponent } from '../../modules/table-list/table-list.component';
import { UpgradeComponent } from '../../modules/upgrade/upgrade.component';
import {ProductComponent} from "../../modules/product/product/product.component";
import {ListProductComponent} from "../../modules/product/list-product/list-product.component";
import {ListfournisseurcomponentComponent} from "../../modules/fournisseur/listfournisseurcomponent/listfournisseurcomponent.component";
import {ListStockComponent} from "../../modules/stock/list-stock/list-stock.component";
import {ListReclamationsComponent} from "../../modules/reclamation/list-reclamations/list-reclamations.component";
import {ListComponent} from "../../modules/factures/list/list.component";
import {ProductDetailsComponent} from "../../modules/product/product-details/product-details.component";

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'product',        component: ListProductComponent/*,
          children: [
            {
              path: '/:idProduct',
              component: ProductDetailsComponent
            }
          ]*/
    },
    { path: 'product/:idProduct',        component: ProductDetailsComponent},
    { path: 'fournisseur',    component: ListfournisseurcomponentComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'stock',          component: ListStockComponent },
    { path: 'reclamation',    component: ListReclamationsComponent },
    { path: 'factures',       component: ListComponent },

];
