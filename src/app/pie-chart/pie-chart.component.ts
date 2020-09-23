import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild,Input, SimpleChanges } from '@angular/core';
import { SharedService } from '../shared/services/SharedService.service';
import { GraphTheme } from '../shared/classes/GraphTheme';

declare var jquery: any;
declare var $: any;
declare var Highcharts: any;
@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit,AfterViewInit {
  @Input() chartWidth: number;

  @Input() chartHeight: number;
  @ViewChild('containerPieChart') containerPieChart: ElementRef;
  @ViewChild('drawer') drawer: any;
  chart2: any;
  colorData: boolean;
  constructor(private _SharedService: SharedService) { }

  ngOnInit() {
  }

  SelectedPoints(){
    console.log(this.chart2.getSelectedPoints());
  }

  //if chart Height or Width changes - update chart size 
  ngOnChanges(changes: SimpleChanges) {
    if (this.drawer !== undefined) {
        this.drawer.open()
   }
    if (this.chart2 !== undefined) {
        this.chart2.setSize(this.chartWidth, this.chartHeight)
    }
}
highlightFunctionality(){
    this._SharedService.cartData.subscribe((value: boolean) => {
      let self=this;
      this.colorData=value;
     
      if(this.chart2.series[1]!==undefined){
          this.chart2.series[1].remove();
      }
      if(self.colorData===true)
      {
          
        console.log(this.chart2.series[0].data[0]);
          for (let i = 0; i < 2; i++) {
            this.chart2.series[0].data[i].color='yellow';
              
          }
          this.chart2.series[0].data[0].update();
      }
  });
}
_GraphTheme:GraphTheme;
addHighchartsTheme(){
    this._GraphTheme=new GraphTheme();
    Highcharts.theme =this._GraphTheme.addHighchartsTheme();
   Highcharts.setOptions(Highcharts.theme);
}
 // Build the chart
  ngAfterViewInit() {
   let self=this;
 
this.addHighchartsTheme();
   this.chart2 =Highcharts.chart(this.containerPieChart.nativeElement, {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      width: this.chartWidth,
      height: this.chartHeight,
      backgroundColor:'rgba(255, 255, 255, 0.0)',
      events: {
        click: function (event) {
            console.log( this.chart2);
        }
      }
  },
  title: {
      text: 'Browser market shares January, 2015 to May, 2015'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  exporting: { enabled: false },
  plotOptions: {
    allowPointSelect: true,
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: false
          },
          showInLegend: true
      },
      theme:Highcharts.theme
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      allowPointSelect: true,
      point:{
        events:{
            click: function (event) {
                console.log( event.point);
               // event.point.color='red';
                self.SelectedPoints();
            }
        }
    }  ,      
      data: [{
          name: 'Microsoft Internet Explorer',
          y: 56.33
      }, {
          name: 'Chrome',
          y: 24.03,
          sliced: true,
          selected: true
      }, {
          name: 'Firefox',
          y: 10.38
      }, {
          name: 'Safari',
          y: 4.77
      }, {
          name: 'Opera',
          y: 0.91
      }, {
          name: 'Proprietary or Undetectable',
          y: 0.2
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'right',
                    layout: 'horizontal'
                },

                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
  }]
});

this.highlightFunctionality();
}

}
