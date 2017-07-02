import { Component, OnInit } from '@angular/core';
import {ReportService} from './service/report.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts'; 

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

  constructor(private reportService : ReportService) { 
    this.options = {
          chart: { type: 'spline' },
          title: { text : 'Seat Availability'},
          series: [{ data: [2,3,5,8,13] }]
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

}
