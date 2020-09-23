import { Component, OnInit, ElementRef, AfterViewInit, Renderer, Input, SimpleChanges } from '@angular/core';
import { Tableservice } from '../shared/services/table.service';

import {
    GridDataResult,
    PageChangeEvent,
    RowArgs
} from '@progress/kendo-angular-grid';

import {
    ViewChild
} from '@angular/core';

import {
    GridComponent,
} from '@progress/kendo-angular-grid';

import 'rxjs/add/operator/debounceTime';
import { State } from '@progress/kendo-data-query/dist/es/state';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid/dist/es/data/change-event-args.interface';
import { SharedServiceMapTableGraphs } from '../shared/services/SharedServiceMapTableGraphs.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';


@Component({
    selector: 'table-reusing-data-items',
    templateUrl: './table-reusing-data-items.component.html',
    styleUrls: ['./table-reusing-data-items.component.scss']
})
export class TableReusingDataItemsComponent implements OnInit,AfterViewInit {
    public multiple = false;
    public allowUnsort = true;
    public sort: SortDescriptor[] = [{
      field: 'ProductName',
      dir: 'asc'
    }];
    
    public state:State={}
    public gridView: GridDataResult;
    public data: any[];
    public pageSize = 50;
    public skip = 0;
    @ViewChild('grid') private grid: GridComponent;
    @ViewChild('sharableLink') sharableLink: ElementRef;
    @ViewChild('drawer') drawer: any;

        @Input() chartWidth: number;

        @Input() chartHeight: number;

        @Input() CluserId: number;
        data_from_client_headline:string

        public startServerPage=0;
        public endServerPage=10000;
        
        public savedresdataBeforeFilters:any;
        public resdata: any;
        public loading:boolean;
    
        public currFilterState:any;
        //public mySelection: number[] = [2, 4,50,60];
        public mySelectionObject: any[] =[]
        public mySelection: any[] =[]
        public mySelectionKey(context: RowArgs): string {
            //ellipse
            return context.dataItem.customer_id +' ' + context.dataItem.LAST_NAME 
            + ' ' + context.dataItem.FIRST_NAME +' '
           + context.dataItem.street
            + ' ' + context.dataItem.city + ' ' + context.dataItem.ttttt;
        }
    public view = new Array(this.pageSize).fill({}).map(x => ({}));

    constructor(private _Tableservice: Tableservice,private renderer:Renderer,
        private _SharedServiceMapTableGraphs:SharedServiceMapTableGraphs) {
        

    }
    filterFromServer(){
        let currFilterStateList=[];
        console.log(this.currFilterState.filter.filters)
        this._Tableservice.filterFromServer
        (this.CluserId,this.startServerPage,this.endServerPage,this.currFilterState.filter.filters).subscribe(res=>{
            console.log(res)
            this.resdata=res
            this.clearData()
            if(this.resdata.length>0)
                this.loadData()


            this.grid.pageChange.debounceTime(0).subscribe((e)=>this.pageChange(e))

            this.refreshTable();

        })
    }
    clearData(){
        this.gridView={
            data:new Array(),
            total:this.resdata.lenght
        }
    }
    gridUserSelectionChange(grid, event){
        
        console.log(this.selectElement)
       
        console.log(this.mySelection)
        this.mySelectionObject=[]
        let res;

        this.saveToSharedService();
      
        console.log(this._SharedServiceMapTableGraphs.tableToMap)
    }
    makeEllipse(){
        for(let i=0;i<this.mySelection.length;i++)
        {
           let tmp=this.mySelection[i].split(" ")
           this.mySelectionObject.push({lat:parseFloat(tmp[1]),lng:parseFloat(tmp[2]),
            hMajor:parseFloat(tmp[3]), hMinor:parseFloat(tmp[4]),Angle:parseFloat(tmp[5])}) 
        }
        console.log(this.mySelectionObject)
    }
    //["1 32.362719 35.01641 1146 22 89", "2 31.945775 35.108228 0.123 0.123 0.123"]
    makePolygon(){
        this.mySelectionObject=[[32.362719,35.01641],[31.945775 ,35.108228],[34.945775 ,35.7],
        [32.362719,35.01641] ]
        console.log(this.mySelectionObject)
    }
    saveToSharedService(){
        console.log(this.selectElement)
        switch (this.selectElement){
            case 'type1'://ellipse
            this.makeEllipse()
            this._SharedServiceMapTableGraphs.tableToMap=this.mySelectionObject
            this._SharedServiceMapTableGraphs.ShapeOnMapType=this.selectElement
            console.log(this._SharedServiceMapTableGraphs.tableToMap)
            break;
            case 'type2'://polygon    
            this.makePolygon()        
            console.log()
            this._SharedServiceMapTableGraphs.tableToMap=this.mySelectionObject
            this._SharedServiceMapTableGraphs.ShapeOnMapType=this.selectElement
            break;
            case 'type3':
            this._SharedServiceMapTableGraphs.selectedHypToMap=this.mySelectionObject
            break;
        }
    }
    convertToFloat(element, index, array) {
       return parseFloat(array[index])
      }
   
    dataStateChange(state:DataStateChangeEvent){
        this.state=state
        this.currFilterState=state
        if(state.filter.filters.length===0)
        {
            this.resdata=this.savedresdataBeforeFilters
            this.updateTable()
        }
    }
    ngOnInit() {
       // $('[data-toggle="tooltip"]').tooltip();  
        console.log(this.CluserId)
        //this.loadInitData();
        
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.drawer !== undefined) {
            this.drawer.open()
       }
    }
    public exportToExcel(grid: GridComponent): void {
        grid.saveAsExcel();
        //grid.saveAsExcel();
    }

    gridValue: string;
    ngAfterViewInit() {
  
    }

    

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
       // console.log("pageChange")
        this.loadData();
    }
   // public nextButton

    /* Generating example data */
    //load_table_by_type
    public load_table_by_type(type) {
        this.loading=true
       // this._Tableservice.getReuseDataTableData()

       this._Tableservice.GetTableByClusterIdStartEnd
       (this.CluserId,0,10000)
            .subscribe(res => {
                console.log(res);
                this.resdata = res;


                this.loadData();
                this.loading=false
                this.updateTable()
            });


    }
    selectElement:string;
    change_table(selectElem){
        switch(selectElem){
            case "type1"://line
                this.selectElement=selectElem
                this.load_table_by_type(0)
                break;
            case "type2"://ellipse
                this.selectElement=selectElem
                this.load_table_by_type(1)
                break;
           case "type2"://hyp
                this.selectElement=selectElem
                this.load_table_by_type(1)
                break;
        }
    }
    refreshTable(){
        var sidebar = document.getElementById("sidebar");
        sidebar.addEventListener("click", function() {
        }, false);

        sidebar.click(); // <==================== The artificial click
        sidebar.click(); 
    }
    filterFromClient(){
        this.resdata=this.savedresdataBeforeFilters
        console.log(this.currFilterState)
        if(this.currFilterState != undefined)
        {
            for(let n=0;n<this.currFilterState.filter.filters.length ; n++)
            {
                console.log(this.currFilterState.filter.filters[n].filters.length)
                if(this.currFilterState.filter.filters[n].filters.length === 2)
                {
                    this.twoFiltersInOneCoulumn(n)
                }
                if(this.currFilterState.filter.filters[n].filters.length === 1)
                {
                    
                    this.oneFiltersInOneCoulumn(n)
                }
            }
        }
        console.log(this.resdata)
        if(this.resdata.length ===0 )
            this.clearData()
        else
            this.loadData()

        this.grid.pageChange.debounceTime(0)
            .subscribe((e)=>this.pageChange(e))
        this.refreshTable()


        //this.dat
            
    }
    private filterOneFromClient(item1,item2,operator):boolean{
        switch(operator){
            case "eq":
            return item1 === item2

            case "neq":
            return item1 === item2

            case "gt":
            return item1 > item2

            case "gte":
            return item1 >= item2

            case "lt":
            return item1 < item2

            case "contains":
            return item1.includes(item2)

            case "startswith":
            return item1.startsWith(item2)

            case "endswith":
            return item1.endsWith(item2)
        }
    }
    oneFiltersInOneCoulumn(n:number){
        let currFilterPair=this.currFilterState.filter.filters[n].filters;
        this.resdata=this.resdata.filter(item=>
            this.filterOneFromClient(item[currFilterPair[0].field],currFilterPair[0].value,currFilterPair[0].operator) 
        )
    }
    twoFiltersInOneCoulumn(n:number){
        if(this.currFilterState.filter.filters[n].logic==='or')
        {
            let currFilterPair=this.currFilterState.filter.filters[n].filters;
            this.resdata=this.resdata.filter(item=>
                this.filterOneFromClient(item[currFilterPair[0].field],currFilterPair[0].value,currFilterPair[0].operator) ||
                this.filterOneFromClient(item[currFilterPair[1].field],currFilterPair[1].value,currFilterPair[1].operator) 
            )
        }
        else if(this.currFilterState.filter.filters[n].logic==='and')
        {
            let currFilterPair=this.currFilterState.filter.filters[n].filters;
            this.resdata=this.resdata.filter(item=>
                this.filterOneFromClient(item[currFilterPair[0].field],currFilterPair[0].value,currFilterPair[0].operator) &&
                this.filterOneFromClient(item[currFilterPair[1].field],currFilterPair[1].value,currFilterPair[1].operator) 
            )
        }
    }
    
    getNextPageFromServer(){
        var self =this;
        this._Tableservice
        .GetTableByClusterIdStartEnd
        (this.CluserId,this.startServerPage+10000,this.endServerPage+10000)
        .subscribe(res=>{
            if(res.length>0){
                self.startServerPage+=10000
                self.endServerPage+=10000

                this.resdata=res;
               // console.log(this.resdata)
                this.updateTable();
            }

        })
    }
    getPrevPageFromServer(){
        var self =this;
        this._Tableservice
        .GetTableByClusterIdStartEnd
        (this.CluserId,this.startServerPage-10000,this.endServerPage-10000)
        .subscribe(res=>{
            if(res.length>0){
     
                self.startServerPage-=10000
                self.endServerPage-=10000

                this.resdata=res;
                //console.log(this.resdata)
                this.updateTable();
            }

        })
    }
    updateTable(){
        this.savedresdataBeforeFilters=this.resdata
        this.loadData()
        this.grid.pageChange.debounceTime(0)
        .subscribe((e) => this.pageChange(e));

        this.refreshTable()
    }
    currentView: any[];
    private loadData(): void {
        this.currentView = this.resdata.slice(this.skip, this.skip + this.pageSize);

        const removeCount = this.view.length - this.currentView.length;

        if (removeCount > 0) {
            this.view.splice(this.currentView.length - 1, removeCount);
        }

        this.currentView.forEach((item, index) => {
            if (!this.view[index]) {
                this.view[index] = {};
            }
            Object.assign(this.view[index], item);
        });
        console.log(this.view)
        this.gridView = {
            data: this.view,
            total: this.resdata.length
        };

   
    }
}
