import { Component, OnInit } from '@angular/core';
import { TestService } from '../test/service/test.service';
import { Http, Response } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['../report/report.component.css'],
    providers: [TestService, DatePipe]
})
export class TestComponent implements OnInit {

    public chart: any;
    public options: Object;
    public data = [];
    public totalArr: Array<Object> = [];
    public enteredArr: Array<Object> = [];
    public exitedArr: Array<Object> = [];
    public timeArr: Array<Object> = [];
    public totalPerson;

    constructor(private router: Router, private testService: TestService, private datePipe: DatePipe) { }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    ngOnInit() {
        this.getReport();

        console.log('init')
        let self = this;

        var webSocket;
                    
        function openSocket(){
        console.log('cLLING ')
            if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
                //writeResponse("WebSocket is already opened.");
                return;
            }
           
            // Ensures only one connection is open at a time

            // Create a new instance of the websocket
            webSocket = new WebSocket("ws://13.59.165.166/");
                
            /**
             * Binds functions to the listeners for the websocket.
             */
            webSocket.onopen = function(event){
                console.log('onOpen')
                // For reasons I can't determine, onopen gets called twice
                // and the first time event.data is undefined.
                // Leave a comment if you know the answer.
                if(event.data === undefined)
                    return;

                self.writeResponse(event.data);
            };

            webSocket.onmessage = function(event){
                console.log('onmwessagn')
                self.writeResponse(event.data);
            };

            webSocket.onclose = function(event){
                self.writeResponse("Connection closed");
            };
        }

        
        function closeSocket(){
            webSocket.close();
        }

        openSocket();
    }

    writeResponse(data) {
        console.log(data)
        for(let i = 0; i< data.length; i++) {
            this.chart.series[2].addPoint(data[i].exitCount)
            this.chart.series[1].addPoint(data[i].entryCount)
            this.chart.series[0].addPoint(this.totalPerson + data[i].entryCount - data[i].exitCount)
        }
    }

    getReport() {
        this.testService.getData().subscribe(
            res => {
                let repoData = res;
                if (repoData) {
                    console.log(repoData);
                    this.data = repoData;
                    this.showData();
                }
            });
    }

    showData() {
        this.totalPerson = 0;
        this.data.forEach((item, index, arr) => {
            this.totalPerson = this.totalPerson + item.entryCount - item.exitCount;
            this.totalArr.push(this.totalPerson);
            this.enteredArr.push(item.entryCount);
            this.exitedArr.push(item.exitCount);
            this.timeArr.push(this.datePipe.transform(item.eventTime, 'HH:mm'));
        })
        console.log('this.enteredArr', this.enteredArr);
        console.log('this.exitedArr', this.exitedArr);
        console.log('this.timeArr', this.timeArr);
        console.log('this.totalArr', this.totalArr);
        this.loadChart();
    }


    loadChart() {
        this.options = {
            colors: ['#E0E000','#f00','#0f0'],

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
                    color: '#E0E000',
                    fontSize: '25px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },

            xAxis: {
                categories: this.timeArr,
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
            },{
                name: 'Entered',
                data: this.enteredArr,
            },{
                name: 'Exited',
                data: this.exitedArr,
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

    showReport() {
        this.router.navigate(['report']);
    }

}
