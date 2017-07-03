import { Component, OnInit } from '@angular/core';
import {ReportService} from './service/report.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 
import {Router} from '@angular/router'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

  constructor(private router : Router, private reportService : ReportService) { 
    this.options = {
          colors: ['#ff0', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
           chart: {
             backgroundColor: {
             linearGradient: { x1: 1, y1: 1, x2: 1, y2: 0 },
             stops: [
                  [0, '#000'],
                  [1, '#002']
                ]
              },
              style: {
                fontFamily: '\'Unica One\', sans-serif'
              },
              plotBorderColor: '#606063'
            },
             labels: {
                  items: [{
                      html: 'Total Seats',
                      style: {
                          left: '60px',
                          top: '5px',
                          color: '#fff',
                          fontSize:'20px'
                      }
                  }]
              },
            title: {
                text: 'Cafeteria Population',
                style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase',
                        fontSize: '20px'
                      }
                  },
                  subtitle: {
                      style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                      }
            },
            xAxis: {
                categories: ['10:00 AM','11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'],
                labels: {
                  style: {
                      color: '#E0E0E3'
                  }
                },
            },
             yAxis: {
                gridLineColor: '#707073',
                labels: {
                  style: {
                      color: '#E0E0E3'
                  }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                  text: 'Total Persons Inside Cafeteria',
                  style: {
                      color: '#E0E0E3',
                      fontSize: '16px',
                  }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
              type: 'spline',
              name: 'Population in Cafe',
              data: [5, 13, 24, 37, 22, 18, 13, 7, 4, 2]
            },
            {
              type: 'pie',
              name: 'Total',
              data: [{
                  name: 'Seats Occupied',
                  y: 13,
                  color:'#b30000', 
              }, {
                  name: 'Seats Vacated',
                  y: 23,
                  color:'#259C07',
              }],
              center: [90, 80],
              size: 150,
              showInLegend: false,
              dataLabels: {
                  enabled: false
              }
          }],
            legend: {
                itemStyle: {
                  color: '#E0E0E3'
                },
                itemHoverStyle: {
                  color: '#FFF'
                },
                itemHiddenStyle: {
                  color: '#606063'
                }
            },
        };
        //setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 1000);
  }

  chart : Object;
  options: Object;
  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnInit() {}

  getReport(){
    this.reportService.getData().subscribe(
      res => {
        console.log(res);
      }
    );
  }
 
  showTest(){
    this.router.navigate(['test']);
  }


}
