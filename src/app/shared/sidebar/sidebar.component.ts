import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
    { path: '/product', title: 'Products',  icon: 'unarchive', class: '' },
    { path: '/stock', title: 'Stocks', icon : 'unarchive', class:''},
    { path: '/fournisseur', title: 'Fournisseurs',  icon: 'person', class: '' },
    { path: '/reclamation', title: 'Mes reclamation',  icon: 'report_problem', class: '' },
    { path: '/factures', title: 'Factures',  icon: 'attach_money', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;

  };
}
