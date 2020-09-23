import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, SimpleChanges, Renderer } from '@angular/core';
import { Http } from '@angular/http';
import { ScatterGraphService } from '../shared/services/ScatterGraph.service';
import { SharedService } from '../shared/services/SharedService.service';
import { GraphTheme } from '../shared/classes/GraphTheme';
declare var jquery: any;
declare var $: any;
declare var Highcharts: any;

@Component({
    selector: 'histogram-graph',
    templateUrl: './histogram-graph.component.html',
    styleUrls: ['./histogram-graph.component.scss']
})
export class HistogramGraphComponent implements  AfterViewInit {

    //private _chartWidth:number;
    @Input() chartWidth: number;

    //private _chartHeight:number;
    @Input() chartHeight: number;
    @ViewChild('drawer') drawer: any;
    colorData: boolean;

    @ViewChild('containerHistogram') containerHistogram: ElementRef;
    @ViewChild('imgContainert') imgContainert: ElementRef;

    
    chart2: any;
    d:any[];
    constructor( private _httpService: Http,private _ScatterGraphService: ScatterGraphService,private _SharedService: SharedService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.drawer !== undefined) {
            this.drawer.open()
       }
        if (this.chart2 !== undefined) {
            this.chart2.setSize(this.chartWidth, this.chartHeight)
            console.log("chartWidth: " + this.chartWidth + " _chartHeight: " + this.chartHeight);
        }
    }

    ClickBtnZoom() {
        Highcharts.removeEvent(this.chart2, 'selection');
    }
   
    ClickBtnLasso() {

        let ch2 = this.chart2;
        Highcharts.addEvent(this.chart2, 'selection', function (event) {

            event.target.pointer.zoomX = false;
            event.target.pointer.zoomY = false;
            let d: any = [];
            if (event.xAxis) {

                console.log('min: ' + event.xAxis[0].min + ', max: ' + event.xAxis[0].max);
                for (let i = 0; i < event.target.series[1].yData.length; i++) {

                    if (event.target.series[1].xData[i] >= event.xAxis[0].min && event.target.series[1].xData[i] <= event.xAxis[0].max && event.target.series[1].yData[i] >= event.yAxis[0].min && event.target.series[1].yData[i] <= event.yAxis[0].max) {

                        d.push([event.target.series[1].xData[i], event.target.series[1].yData[i]]);
                    }
                }
                this.selectedSeriescounter+=1;
                event.target.addSeries({
                    name: 'Selection',
                    data: d,
                    type: 'scatter',
                    color: 'red',
                    showInNavigator: false,
                    marker: {
                        radius: 2
                    },
                    navigator: {
                        series: {
                            type: 'line',
                            color: 'black',
                        }
                    }
                })
            }



        });
    }
    ClickBtnHighlight(){
        this._SharedService.cartData.emit(true);
    }
    highlightFunctionality(){
        //highlight functionality
        this._SharedService.cartData.subscribe((value: boolean) => {
          let self=this;
          let d:any[]=[];
          this.colorData=value;
          if(this.chart2.series[2]!==undefined){
              this.chart2.series[2].remove();
          }
          if(self.colorData===true)
          {
              
  
              for (let i = 0; i < 20000; i++) {
  
              d.push([this.chart2.series[1].xData[i], this.chart2.series[1].yData[i]]);
                  
              }
             
              this.chart2.addSeries({
                  name: 'Highlight',
                  data: d,
                  type: 'scatter',
                  color: 'yellow',
                  marker: {
                    radius: 2
                }
              })
          }
      });
}
  
ClickExportChart()
{
   //var img = document.querySelector('img');
    //img.src = 'data:image/svg+xml;base64,' + window.btoa(this.chart2.getSVG());

    //var imgContainert = document.getElementById('imgContainert');

    //his.imgContainert.nativeElement

    //remove all images
console.log(this.imgContainert.nativeElement)
while (this.imgContainert.nativeElement.hasChildNodes()) {
    this.imgContainert.nativeElement.removeChild(this.imgContainert.nativeElement.lastChild);
  }
    var image = new Image();
    image.src = 'data:image/svg+xml;base64,' + window.btoa(this.chart2.getSVG());
    this.imgContainert.nativeElement.appendChild(image);
}
_GraphTheme:GraphTheme;
addHighchartsTheme(){
    this._GraphTheme=new GraphTheme();
    Highcharts.theme =this._GraphTheme.addHighchartsTheme();
   Highcharts.setOptions(Highcharts.theme);
}

    ngAfterViewInit() {
        let r=[]
        this.addHighchartsTheme();
        this._ScatterGraphService
        .getXYGraphByCluster_startEnd(0,100000)

            .subscribe(res => {
                for(let i=0;i<100000;i++)
                {
                    r.push([i,i]);
                }
                this.chart2 = Highcharts.chart(this.containerHistogram.nativeElement, {
                    chart: {
                        zoomType: 'xy',
                        width: this.chartWidth,
                        height: this.chartHeight,
                    
                    },
                    exporting: { enabled: false },
                    boost: {
                        useGPUTranslations: true
                    },
                    title: {
                        text: 'Highcharts Histogram'
                    },
                    xAxis: [{
                        title: { text: 'Data' }
                    }, {
                        title: { text: 'Histogram' },
                        opposite: true
                    }],
      

                    yAxis: [{
                        title: { text: 'Data' }
                    }, {
                        title: { text: 'Histogram' },
                        opposite: true
                    }],
                   /* exporting: {
                        filename: '1',
                        url:'http://localhost:60985/api/Values/add'
                    },*/
                    series: [{
                        name: 'Histogram',
                        type: 'histogram',
                        xAxis: 1,
                        yAxis: 1,
                        baseSeries: 's1',
                        zIndex: -1
                    }, {
                        name: 'Data',
                        type: 'scatter',
                        data: r,
                        id: 's1',
                        marker: {
                            radius: 1.5
                        }
                    }]
            
                });
            });

           
            this.highlightFunctionality();
        }

}
