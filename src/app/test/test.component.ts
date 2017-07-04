import { Component, OnInit } from '@angular/core';
import {TestService} from '../test/service/test.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['../report/report.component.css'],
  providers: [TestService, DatePipe]
})
export class TestComponent implements OnInit {

  public chart : Object;
  public options: Object;
  public data= [];
  public totalArr:Array<Object> = [];
  public enteredArr:Array<Object> = [];
  public exitedArr:Array<Object> = [];
  public timeArr:Array<Object> = [];

 constructor(private router : Router, private testService : TestService, private datePipe :DatePipe ) { }

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
    let totalPerson=0;
      this.data.forEach((item,index,arr)=> {
        totalPerson = totalPerson + item.entryCount -item.exitCount;
        this.totalArr.push(totalPerson);
        this.enteredArr.push(item.entryCount);
        this.exitedArr.push(item.exitCount);
        this.timeArr.push(this.datePipe.transform(item.eventTime,'HH:mm'));
     })
    console.log('this.enteredArr',this.enteredArr);
    console.log('this.exitedArr',this.exitedArr);
    console.log('this.timeArr',this.timeArr);
    console.log('this.totalArr',this.totalArr);
    this.loadChart();
  }


  loadChart(){
    this.options = {
        colors: ['#cccc00'],

        chart: {
          type: 'spline',
          backgroundColor: {
          linearGradient: { x1: 0, y1: 1, x2: 1, y2: 0 },
          stops: [
              [0, '#000'],
              [1, '#003']
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
            categories:this.timeArr,
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
            name: 'Total Persons',
            data: this.totalArr,
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
