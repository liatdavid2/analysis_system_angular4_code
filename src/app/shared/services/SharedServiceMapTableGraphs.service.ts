import { Injectable, EventEmitter, OnChanges,Output } from "@angular/core";
import { CurrUserSessionCluster } from "app/shared/classes/CurrUserSessionCluster";


@Injectable()
export class SharedServiceMapTableGraphs implements OnChanges{
   
    @Output() tableToMap:any[]=[];

    @Output() ShapeOnMapType:string='';

    @Output() selectedLinesToMap:any[]=[];
    @Output() selectedEllipseToMap:any[]=[];
    @Output() selectedHypToMap:any[]=[];
   // @Output() tableToMap:any[] = [];
    //@Output() currUserSessionCluster = new EventEmitter<CurrUserSessionCluster>();
    ngOnChanges(){
        console.log("ngOnChanges()",this.tableToMap);
      // console.log("ngOnChanges()",this.currUserSessionCluster)
    }
    setData(value){
       // console.log(value);
       // this.tableToMap=value
       // this.formData = value;
    }
    getData():any[]{
        //console.log({tableToMap:this.tableToMap})
        return this.tableToMap;
    }
} 