import { Injectable, EventEmitter, OnChanges,Output } from "@angular/core";
import { CurrUserSessionCluster } from "app/shared/classes/CurrUserSessionCluster";


@Injectable()
export class SharedService implements OnChanges{
    @Output() cartData = new EventEmitter<any>();
    @Output() currUser = new EventEmitter<number>();
    @Output() currSession = new EventEmitter<number>();
    @Output() currCluster = new EventEmitter<number>();

    //@Output() currUserSessionCluster = new EventEmitter<CurrUserSessionCluster>();
    ngOnChanges(){
       // console.log(this.cartData);
      // console.log("ngOnChanges()",this.currUserSessionCluster)
    }
    setData(value){
        console.log(value);
        
       // this.formData = value;
    }
    getData(){
        console.log({cartData:this.cartData,currUser:this.currUser,
            currSession:this.currSession,currCluster:this.currCluster})
        return {cartData:this.cartData,currUser:this.currUser,
            currSession:this.currSession,currCluster:this.currCluster};
    }
} 