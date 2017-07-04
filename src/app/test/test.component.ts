import { Component, OnInit } from '@angular/core';
import {TestService} from '../test/service/test.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 
import {Router} from '@angular/router'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['../report/report.component.css'],
  providers: [TestService]
})
export class TestComponent implements OnInit {

  public chart : Object;
  public options: Object;
  public data= [];
  public enteredArr:Array<Object> = [];
  public exitedArr:Array<Object> = [];
  public timeArr:Array<Object> = [];

 constructor(private router : Router, private testService : TestService) { }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnInit() {
    this.getReport();
  }

  getReport(){
    this.testService.getData().subscribe(
      res => {
        let repoData = res;
        if (repoData){
          console.log(repoData);
          this.data=repoData;
          this.showData();
        }  
      });
  }

  showData(){  
     this.data.forEach((item,index,arr)=> {
       this.enteredArr.push(item.entryCount);
       this.exitedArr.push(item.exitCount);
       this.timeArr.push(item.eventTime);
     })


    this.loadChart();
  }


  loadChart(){
    this.options = {
        colors: ['#b30000', '#259C07'],

        chart: {
          type: 'spline',
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
        },

        title: {
          text: 'Real Time Population Analysis in Cafetaria',
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
  }

  showReport(){
    this.router.navigate(['report']);
  }

}
