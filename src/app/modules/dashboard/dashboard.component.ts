import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {ChartDataSets, ChartType} from 'chart.js';
import {ProduitService} from "../../core/services/produit/produit.service";
import {WebSocketAPIService} from "../../core/services/webSocketAPI/web-socket-api.service";
import {UserService} from "../../core/services/user/user.service";
import {ReclamationService} from "../../core/services/reclamation/reclamation.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  revenue: number;
  usersNumber: number;
  reclamationsNumber: number;

  // Products By Category Chart
  categoryChartData: MultiDataSet = [];
  categoriesChartLabels: Label[] = [];
  doughnutChartType: ChartType = 'doughnut';
  donutColors = [
    {
      backgroundColor: [
        '#fd960e',
        '#ed4e4a',
        '#4aa64e'
      ]
    },
  ];

  // Monthly Revenue Chart

  lineChartData: ChartDataSets[];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  lineChartOptions = {
    responsive: true
  };
  lineChartColors: Color[] = [
    {
      borderColor: '#0a4067',
      backgroundColor: '#0a4067',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];

  constructor(private produitService: ProduitService,
              private userService: UserService,
              private reclamationService: ReclamationService,
              private webSocketAPI: WebSocketAPIService) {
  }

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  getMonthlyRevenue() {
    this.produitService.getMonthlyRevenue().subscribe(value => this.revenue = value);
  }

  ngOnInit() {
    this.userService.list().subscribe(value => this.usersNumber = value.length);
    this.reclamationService.findAll().subscribe(value => this.reclamationsNumber = value.filter(value1 => !value1.etat).length);
    this.getMonthlyRevenue();
    this.webSocketAPI._connect();
    this.webSocketAPI.webSocketNotifier.subscribe(res => {
      setTimeout(() => {
        this.getMonthlyRevenue();
      }, 500);
    });

    // Chart Products By Category


    this.categoriesChartLabels.push("ELECTROMENAGER");
    this.categoriesChartLabels.push("ALIMENTAIRE");
    this.categoriesChartLabels.push("QUINCAILLERIE");

    this.produitService.findAll().subscribe(value => {
      // @ts-ignore
      this.categoryChartData.push(value.filter(value1 => value1.detailProduit.categorieProduit == "ELECTROMENAGER").length);
      // @ts-ignore
      this.categoryChartData.push(value.filter(value1 => value1.detailProduit.categorieProduit == "ALIMENTAIRE").length);
      // @ts-ignore
      this.categoryChartData.push(value.filter(value1 => value1.detailProduit.categorieProduit == "QUINCAILLERIE").length);
    });

    // Monthly Revenue Chart

    let tab;
    this.lineChartData = [
      {data: [], label: 'Revenue By Month'},
    ];
    this.produitService.getRevenueByMonth().subscribe(value => {
        tab = value;
        /* setTimeout(() => {
         }, 1000);*/
      }
      , error => {
      }, () => {
        this.lineChartData = [
          {data: tab, label: 'Revenue By Month'},
        ];
      });


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);


    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
