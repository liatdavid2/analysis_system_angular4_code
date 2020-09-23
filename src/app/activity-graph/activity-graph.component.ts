import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ScatterGraphService } from 'app/shared/services/ScatterGraph.service';
import { GraphTheme } from '../shared/classes/GraphTheme';
declare var jquery: any;
declare var $: any;
declare var Highcharts: any;
@Component({
  selector: 'activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss']
})
export class ActivityGraphComponent implements OnInit, AfterViewInit {

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

  getPrevPageFromServer() {
      var self = this
      this._ScatterGraphService

              if (this.startServerPage != 0) {
                  this.startServerPage -= 100000
                  this.endServerPage -= 100000

                  this.chart2.series[0].update({
                      //data: res,
                      type: 'scatter',
                      color: 'rgb(152, 0, 67)',
                      marker: {
                          radius: 2
                      }
                  })
              }
          
  }
  updateStartEndServerPage(){
      this.startServerPage += 100000
      this.endServerPage += 100000
  }
  _GraphTheme:GraphTheme;

  getNextPageFromServer() {
      var selfNext = this
      this.startServerPage+=100000
      this.endServerPage+=100000

  
         
                  this.chart2.series[0].update({
                      name: ' no more data',
                      data: []
                  })

                  this.startServerPage-=100000
                  this.endServerPage-=100000
           
          
  }
  changeGraphYAxisDate() {
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
   
              this.chart2.tooltip.update({
                  formatter: function () {
                      return '<b>' + this.series.name + '</b><br/>' +
                          Highcharts.dateFormat('%e - %b - %Y %H:%M:%S',
                              new Date(this.y))
                          + '  <br/>' + new Date(this.x) + ' K.';
                  }
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
            ActivityGraphComponent.selectElementX = "Catagory"
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
            ActivityGraphComponent.selectElementX = "Number"
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

            ActivityGraphComponent.selectElementX = "Date"
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
      if (this.chart2 !== undefined) {
          this.chart2.setSize(this.chartWidth, this.chartHeight)
      }
  }
  addHighchartsTheme(){
      this._GraphTheme=new GraphTheme();
      Highcharts.theme =this._GraphTheme.addHighchartsTheme();
     Highcharts.setOptions(Highcharts.theme);
  }
  ngAfterViewInit() {
      this.addHighchartsTheme();

              this.chart2 = Highcharts.chart(this.containerScatterGraph.nativeElement, {
                chart: {
                  type: 'xrange',
                  styledMode: true,
                  zoomType: 'xy',
                  width: this.chartWidth,
                  height: this.chartHeight,
              },
              exporting: { enabled: false },
              title: {
                  text: 'Activity Graph'
              },
              xAxis: {
                  type: 'datetime'
              },
              yAxis: {
                  title: {
                      text: ''
                  },
                  categories: ['Project 1', 'Project 2', 'Project 3'],
                  reversed: true
              },
              series: [{
                  name: 'Project 1',
                  pointWidth: 20,
                  data: [{
                      x: 1516199002000,
                      x2: 1516199111000,
                      y: 0,
                  },{
                    x: 1516199167000,
                    x2: 1516199567500,
                    y: 1,
                },
                
                {
                    x: 1516199567500,
                    x2: 1516199667500,
                    y: 2,
                },
                {
                    x: 1516199002000,
                    x2: 1516199311000,
                    y: 2,
                },
                {
                    x: 1516199367500,
                    x2: 1516199667500,
                    y: 0,
                }
              ]
              }],
              });

  }
}
