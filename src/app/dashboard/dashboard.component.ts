import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GridsterItem } from '../../lib/index';
import { GridsterConfigS } from '../../lib/gridsterConfigS.interface';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Http } from '@angular/http';
import { CListService } from '../shared/services/CListService.service';
import { SharedService } from '../shared/services/SharedService.service';
import { ClustersService } from 'app/shared/services/clusters.service';
import { ActivatedRoute } from '@angular/router';
import { CLUSTER } from '../shared/classes/Cluster';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  clusterViews: String[] = []

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('mattoolbar') mattoolbar: any;
  
  options: GridsterConfigS;
  static dashboard: Array<GridsterItem>;
  clustersList: CLUSTER[]=[{CLUSTERID:1,CLUSTER_NAME:'covid-19 Analysis',CLUSTER_Image:''},
  {CLUSTERID:2,CLUSTER_NAME:'Healthcare Analysis',CLUSTER_Image:''},
  {CLUSTERID:3,CLUSTER_NAME:'500 US Companies Analysis',CLUSTER_Image:''},
  {CLUSTERID:4,CLUSTER_NAME:'FAANG Stock Analysis',CLUSTER_Image:''},
  {CLUSTERID:5,CLUSTER_NAME:'IMDB Movies Analysis',CLUSTER_Image:''},
  {CLUSTERID:6,CLUSTER_NAME:'Olympics Athlete Events Analysis',CLUSTER_Image:''},
  {CLUSTERID:7,CLUSTER_NAME:'NBA playoff 2020 Analysis',CLUSTER_Image:''},
  {CLUSTERID:8,CLUSTER_NAME:'TV sales Analysis',CLUSTER_Image:''}, 
  {CLUSTERID:9,CLUSTER_NAME:'LEGO Minifigures Analysis',CLUSTER_Image:''}];
  colorData: boolean;
  static eventStop(item, itemComponent, event) {
    //console.info('eventStop', item, itemComponent, event);
  }

  static itemChange(item, itemComponent) {
    //console.info('itemChanged', item, itemComponent);
  }



  static itemInit(item, itemComponent) {
    //console.info('itemInitialized', item, itemComponent);
  }

  static itemRemoved(item, itemComponent) {
    // console.info('itemRemoved', item, itemComponent);
  }

  emptyCellClick(event, item) {
    // console.info('empty cell click', event, item);
    DashboardComponent.dashboard.push(item);
  }
  constructor(private _httpService: Http, private _CListService: CListService,
    private _SharedService: SharedService, 
    private _ClustersService: ClustersService, private route: ActivatedRoute, ) {
    _SharedService.currSession.subscribe(res => {
      console.log("dashboard _SharedService", res)
    })

  }
  Sdata: any = "Shared Data22";
  highlight() {
    this.colorData = true;
    this._SharedService.cartData.emit(this.colorData);

  }

  showClusterGraph(cluster) {
    console.log(cluster.CLUSTERID)

  }
  ngOnInit() {

    this.sidenav.open();


    this.options = {
      gridType: 'fit',
      compactType: 'none',
      hasContent: true,
      itemChangeCallback: DashboardComponent.itemChange,
      itemResizeCallback: DashboardComponent.itemResize,
      itemInitCallback: DashboardComponent.itemInit,
      itemRemovedCallback: DashboardComponent.itemRemoved,
      margin: 5,
      outerMargin: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'container',
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        stop: DashboardComponent.eventStop
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        stop: DashboardComponent.eventStop,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      api: {
        resize: DashboardComponent.eventStop,
        optionsChanged: DashboardComponent.eventStop,
        getNextPossiblePosition: DashboardComponent.eventStop,
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: 'onDrag&Resize',
      disableWindowResize: false
    };

    DashboardComponent.dashboard = [];

  }

  allowDrag() {
     this.options.draggable.enabled=false;
  }
  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
  lastDashboard: Array<GridsterItem>;


  static itemResize(item, itemComponent) {

    if (DashboardComponent.dashboard[DashboardComponent.dashboard.indexOf(item)] !== undefined) {
      DashboardComponent.dashboard[DashboardComponent.dashboard.indexOf(item)].chartWidth = itemComponent.width;
      DashboardComponent.dashboard[DashboardComponent.dashboard.indexOf(item)].chartHeight = itemComponent.height-50;
    }
  }
  RegularScreen($event, item) {
    console.log(item);
    DashboardComponent.dashboard = this.lastDashboard;
    console.log(this.lastDashboard);

  }
  lastIndex: number;

  removeItem($event, item) {
    // $event.preventDefault();
    //$event.stopPropagation();
 
    DashboardComponent.dashboard.splice(DashboardComponent.dashboard.indexOf(item), 1);

  }
  yValue: number = 0;
  //CluserType - map / graph=2 / table
  addItemByCluserIdAndType(cluster, ViewType) {
    console.log(cluster)

    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: ViewType
    });

    this.yValue++;
    console.log(DashboardComponent.dashboard)

  }
  addAnalizeByCluserIdAndType2(cluster) {
    //pie
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: 6
    });
    //table
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: 3
    });

    //Graph
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: 2
    });

    this.yValue++;
  }
  addAnalizeByCluserIdAndType(cluster, ViewType) {
    console.log(cluster)
    //pie
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: 6
    });
    //table
    // DashboardComponent.dashboard.push({label:"dfgdf",i:this.yValue,chartWidth:500,
    // chartHeight:200,hasContent: true,CluserId:cluster.CLUSTERID,
    // ViewType:1});
    //map
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true, CluserId: cluster.CLUSTERID,
      ViewType: 7
    });


    this.yValue++;
    console.log(DashboardComponent.dashboard)

  }
  makeReport() {
    DashboardComponent.dashboard.push({
      label: "dfgdf", i: this.yValue, chartWidth: 500,
      chartHeight: 200, hasContent: true,
      ViewType: 0
    });

    this.yValue++;
  }
  addItem() {


    DashboardComponent.dashboard.push({ label: "dfgdf", i: this.yValue, chartWidth: 500, chartHeight: 200, hasContent: true });

    this.yValue++;

  }


  get staticDashboard() {
    return DashboardComponent.dashboard;
  }



}
