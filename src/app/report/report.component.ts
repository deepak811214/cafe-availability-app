import { Component, OnInit } from '@angular/core';
import { ReportService } from './service/report.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { Router } from '@angular/router'

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [ReportService]
})

export class ReportComponent implements OnInit {

    public chart: Object;
    public options: Object;
    public data = { entryCount: 0, exitCount: 0 };
    public seatAvailable: number = 50;
    public seatOccupied: number = 0;;
    public totalSpace: number = 50;

    constructor(private router: Router, private reportService: ReportService) { }

    ngOnInit() {
        this.getReport();
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    getReport() {
        this.reportService.getData().subscribe(
            res => {
                let repoData = res;
                console.log(repoData);
                if (repoData) {
                    this.data = repoData;
                    this.showData();
                }
            });
    }

    showData() {
        this.seatOccupied = this.data.entryCount - this.data.exitCount;
        if (this.seatOccupied < 0) {
            this.seatOccupied = 0;
        }
        console.log('this.seatOccupied:', this.seatOccupied);
        this.seatAvailable = this.totalSpace - this.seatOccupied;
        console.log('this.seatAvailable', this.seatAvailable);

        this.loadChart();
    }

    loadChart() {
        this.options = {
            colors: ['#259C07', '#ff1111'],

            chart: {
                backgroundColor: {
                    linearGradient: { x1: 1, y1: 1, x2: 1, y2: 0 },
                    stops: [
                        [0, '#000'],
                        [1, '#003']
                    ]
                },
                type: 'pie'
            },

            title: {
                text: 'Cafeteria\'s Population Report @ Real Time',
                style: {
                    color: '#E0E000',
                    fontSize: '25px',
                }
            },

            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} %',
                        style: {
                            color: '#fff',
                            fontSize: '15px',
                        },
                        connectorColor: 'silver',
                        showInLegend: true
                    }
                }
            },

            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [
                    {
                        name: 'Total Seats Available',
                        y: this.seatAvailable,
                    }, {
                        name: 'Total Seats Occupied',
                        y: this.seatOccupied,
                    }
                ]
            }],
        };
    }

    showTest() {
        this.router.navigate(['test']);
    }


}
