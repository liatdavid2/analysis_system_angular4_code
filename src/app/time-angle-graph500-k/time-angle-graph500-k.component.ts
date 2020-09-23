import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ScatterGraphService } from 'app/shared/services/ScatterGraph.service';
import { GraphTheme } from '../shared/classes/GraphTheme';
declare var jquery: any;
declare var $: any;
declare var Highcharts: any;
@Component({
    selector: 'time-angle-graph500-k',
    templateUrl: './time-angle-graph500-k.component.html',
    styleUrls: ['./time-angle-graph500-k.component.scss']
})
export class TimeAngleGraph500KComponent implements OnInit, AfterViewInit {
    @Input() chartWidth: number;

    @Input() chartHeight: number;

    @Input() CluserId: number;
    @ViewChild('containerScatterGraph') containerScatterGraph: ElementRef;
    @ViewChild('drawer') drawer: any;

    startServerPage = 0
    endServerPage = 100000
    constructor(private _ScatterGraphService: ScatterGraphService) { }

    ngOnInit() {
        console.log(this.CluserId)
        // var n = 100000;
        //this.data = this.getData(n);
    }
    static selectElementX: string = 'Date';
    Change_Y_Axis(selectElement) {

        switch (selectElement) {
            /*case 'Date': {
                this.changeGraphYAxisDate();
                break;
            }*/
            case 'Catagory': {
                this.changeGraphAxisYCatagory();
                break;
            }
            case 'Number': {
                this.changeGraphYAxisNumber();
                break;
            }
        }
    }
    getPrevPageFromServer() {
        var self = this
        this._ScatterGraphService
            .getXYGraphByCluster_startEnd(this.startServerPage - 100000, this.endServerPage - 100000)
            .subscribe(res => {
                if (this.startServerPage != 0) {
                    this.startServerPage -= 100000
                    this.endServerPage -= 100000

                    this.chart2.series[0].update({
                        data: res,
                        type: 'scatter',
                        color: 'rgb(152, 0, 67)',
                        marker: {
                            radius: 2
                        }
                    })
                }
            })
    }
    updateStartEndServerPage() {
        this.startServerPage += 100000
        this.endServerPage += 100000
    }
    _GraphTheme: GraphTheme;

    getNextPageFromServer() {
        var selfNext = this
        this.startServerPage += 100000
        this.endServerPage += 100000
        this._ScatterGraphService
            .getXYGraphByCluster_startEnd(this.startServerPage, this.endServerPage)
            .subscribe(res => {
                console.log(res.length)
                if (res.length > 0) {

                    // selfNext.startServerPage += 100000
                    //  selfNext.endServerPage += 100000
                    console.log(this.startServerPage)
                    this.chart2.series[0].update({
                        data: res,
                        type: 'scatter',
                        color: 'rgb(152, 0, 67)',
                        marker: {
                            radius: 2
                        }
                    })
                }
                else {
                    this.chart2.series[0].update({
                        name: ' no more data',
                        data: []
                    })

                    this.startServerPage -= 100000
                    this.endServerPage -= 100000
                }
            })
    }
    changeGraphYAxisDate() {
        this._ScatterGraphService.getYData()
            .subscribe(res => {


                this.chart2.series[0].update({
                    data: [1417680117775, 1417680119040]
                });
                this.chart2.yAxis[0].update({
                    type: 'datetime',
                    categories: null,
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%d:%m:%Y', this.value);
                        }
                    },
                });
                if (this.chart2.xAxis[0].type === 'datetime') {
                    this.handleAxis_x_Datetime(res);
                }
                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%e - %b - %Y %H:%M:%S',
                                new Date(this.y))
                            + '  <br/>' + new Date(this.x) + ' K.';
                    }
                });
            });
    }
    changeGraphYAxisNumber() {
        this._ScatterGraphService.getYData()
            .subscribe(res => {
                console.log(res)
                this.chart2.series[0].update({
                    data: res,
                });

                this.chart2.yAxis[0].update({
                    type: 'linear',
                    categories: null,
                });
                this.chart2.yAxis[0].setTitle({
                    text: 'New y axis title'
                });
                if (this.chart2.xAxis[0].userOptions.type === "datetime") {
                    console.log("this.chart2.xAxis[0].type==='datetime'")
                    this.handleAxis_x_Datetime(res);
                    this.chart2.tooltip.update({
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' +
                                Highcharts.dateFormat('%e - %b - %Y %H:%M:%S', new Date(this.x))
                                + '  <br/>' + this.y;

                        }
                    });
                }
                else
                    this.chart2.tooltip.update({
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' + this.x + ' K.'
                                + '  <br/>' + this.y + ' K.';

                        }
                    });
            });
    }
    handleAxis_x_Datetime(res) {
        this.chart2.series[0].update({
            data: res,
            pointStart: Date.UTC(2012, 2, 30),
            pointInterval: 60 * 1000, // minuts
        });

    }
    changeGraphAxisYCatagory() {
        this._ScatterGraphService.getYData()
            .subscribe(res => {
                TimeAngleGraph500KComponent.selectElementX = "Catagory"
                var arr = [];
                let i, x;

                for (let i = 0; i < 100000; i++) {
                    arr.push("catagory" + i);
                }
                console.log(arr)

                this.chart2.yAxis[0].update({
                    type: 'category',
                    categories: arr
                });
                if (this.chart2.xAxis[0].userOptions.type === "datetime") {
                    this.handleAxis_x_Datetime(res);
                }

                else
                    this.chart2.tooltip.update({
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>'
                                + this.point.series.yAxis.categories[this.y] + '<br/>' + this.x + ' K.';
                        }
                    });
            });
    }
    Change_X_Axis(selectElement) {

        switch (selectElement) {
            case 'Date': {
                this.changeGraphAxisXDate();
                break;
            }
            case 'Catagory': {
                this.changeGraphAxisXCatagory();
                break;
            }
            case 'Number': {
                this.changeGraphXAxis();
                break;
            }
        }
    }
    Axis_Y_TypeTooltipFormater() {
        console.log(this.chart2)
        switch (this.chart2.yAxis[0].userOptions.type) {
            case "datetime": {
                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>'
                            + this.point.series.xAxis.categories[this.key] + '<br/>'
                            + Highcharts.dateFormat('%e - %b - %Y %H:%M:%S', new Date(this.y)) + ' K.';
                    }
                });
                break;
            }
            case "category": {
                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>'
                            + this.point.series.xAxis.categories[this.key] + '<br/>'
                            + this.point.series.yAxis.categories[this.key] + ' K.';
                    }
                });
                break;
            }
            case "linear": {
                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>'
                            + this.point.series.xAxis.categories[this.key] + '<br/>'
                            + this.y + ' K.';
                    }
                });
                break;
            }
        }

    }
    changeGraphAxisXCatagory() {
        var self = this
        this._ScatterGraphService.getYData()
            .subscribe(res => {
                TimeAngleGraph500KComponent.selectElementX = "Number"
                var arr = [];
                let i, x;

                for (let i = 0; i < 100000; i++) {
                    arr.push("catagory" + i);
                }
                console.log(arr)

                this.chart2.xAxis[0].update({
                    type: 'category',
                    categories: arr
                });
                this.chart2.series[0].update({
                    //  data: res,
                    pointStart: 0,
                    pointInterval: 1
                });
                self.Axis_Y_TypeTooltipFormater();

            });
    }

    changeGraphAxisXDate() {
        this._ScatterGraphService.getYData()
            .subscribe(res => {

                TimeAngleGraph500KComponent.selectElementX = "Date"
                this.chart2.xAxis[0].update({
                    type: 'datetime',
                    categories: null,
                });
                this.chart2.series[0].update({
                    // data: res,
                    pointStart: Date.UTC(2012, 2, 30),
                    pointInterval: 60 * 1000, // minuts
                });



                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%e - %b - %Y %H:%M:%S',
                                new Date(this.x))
                            + '  <br/>' + this.y + ' K.';
                    }
                });
            });
    }
    changeGraphXAxis() {
        this._ScatterGraphService.getData()
            .subscribe(res => {
                console.log(res)
                this.chart2.series[0].update({
                    // data: res,
                    pointStart: 0,
                    pointInterval: 1
                });

                this.chart2.xAxis[0].update({
                    type: 'linear',
                    categories: null,
                });
                this.chart2.xAxis[0].setTitle({
                    text: 'New x axis title'
                });


                this.chart2.tooltip.update({
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' + this.x + ' K.'
                            + '  <br/>' + this.y + ' K.';
                    }
                });
            });
    }


    data: any;
    chart2: any;
    /*getData(n) {
      var arr = [];
      let i,x;
   
     for(let i=0;i<n;i++)
     {
      arr.push(i);
     }
     console.log(arr)
      return arr;
  }*/
    ngOnChanges(changes: SimpleChanges) {
        if (this.drawer !== undefined) {
            this.drawer.open()
        }

        //console.log(changes);
        if (this.chart2 !== undefined) {
            this.chart2.setSize(this.chartWidth, this.chartHeight)
            //console.log("chartWidth: " + this.chartWidth + " _chartHeight: " + this.chartHeight);
        }
    }
    addHighchartsTheme() {
        this._GraphTheme = new GraphTheme();
        Highcharts.theme = this._GraphTheme.addHighchartsTheme();
        Highcharts.setOptions(Highcharts.theme);
    }
    ngAfterViewInit() {
        this.addHighchartsTheme();
        // this._ScatterGraphService.getYData()
        this._ScatterGraphService.getXYGraphByCluster_startEnd(0, 100000)
            .subscribe(res => {

                this.chart2 = Highcharts.chart(this.containerScatterGraph.nativeElement, {
                    chart: {
                        zoomType: 'xy',
                        width: this.chartWidth - 20,
                        height: this.chartHeight,
                    },
                    boost: {
                        //useGPUTranslations: true
                    },
                    exporting: { enabled: false },
                    title: {
                        text: 'Highcharts drawing ' + 100000 + ' points'
                    },

                    subtitle: {
                        text: 'Using the Boost module'
                    },

                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' + Highcharts
                                .dateFormat('%e - %b - %Y %H:%M:%S', new Date(this.x)) + '  <br/>'
                                + this.y + ' .';
                        }
                    },
                    xAxis: {
                        minTickInterval: 1,

                    },
                    series: [{
                        data: res.slice(1, 20000),
                        type: 'scatter',
                        color: 'rgb(156, 193, 1)',
                        marker: {
                            radius: 2
                        },
                    },
                    {
                        data: res.slice(20000, 40000),
                        type: 'scatter',
                        color: 'rgb(0, 124, 210)',
                        marker: {
                            radius: 2
                        },
                    },
                    {
                        data: res.slice(40000, 80000),
                        type: 'scatter',
                        color: 'rgb(210, 54, 91)',
                        marker: {
                            radius: 2
                        },
                    },
                    {
                        data: res.slice(80000, res.length),
                        type: 'scatter',
                        color: 'rgb(254, 154, 60)',
                        marker: {
                            radius: 2
                        },
                    }]


                });
            });

        //this. highlightFunctionality();

    }

}
