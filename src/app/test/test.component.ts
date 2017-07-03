import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report/service/report.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 
import {Router} from '@angular/router'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['../report/report.component.css'],
  providers: [ReportService]
})
export class TestComponent implements OnInit {

 constructor(private router : Router, private reportService : ReportService) { 
    this.options = {
          colors: ['#b30000', '#259C07', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
           chart: {
             type: 'column',
             backgroundColor: {
             linearGradient: { x1: 0, y1: 1, x2: 1, y2: 0 },
             stops: [
                  [0, '#000'],
                  [1, '#002']
                ]
              },
              style: {
                fontFamily: '\'Unica One\', sans-serif'
              },
             // plotBorderColor: '#606063'
            },
            title: {
                text: 'Population Analysis in Cafetaria',
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
                  text: 'Number Of Persons',
                  style: {
                      color: '#E0E0E3',
                      fontSize: '16px',
                  }
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'Entered',
                data: [5, 3, 4, 7, 2, 8, 3, 4, 2, 2]
            }, {
                name: 'Exit',
                data: [2, 2, 0, 2, 1, 2, 1, 5, 0, 3]
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
       // setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 1000);
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

  showReport(){
    this.router.navigate(['report']);
  }

}
