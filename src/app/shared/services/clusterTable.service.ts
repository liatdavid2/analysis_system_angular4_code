import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, } from '@angular/common/http';
import { Http, Headers, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class clusterTable extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }
    sessionId:number;
    private data: any[] = [];

    public read() {
        console.log("read()",this.data);
        if (this.data.length) {
            console.log("read()",this.data);
            return super.next(this.data);
           
        }

        this.fetch()
            .do(data => {
                console.log(this.data,data);
                this.data = data;
                
            })
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();
       // console.log(this.data);
        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        //find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        //revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(action: string = "", data?: any): Observable<any[]>  {
      console.log("fetch",action,data)
      this.sessionId=1;
        //return this.http        
        return this.http.get('http://localhost:60985/api/Table')
       //.get('http://localhost:60985/api/clusterWithoutParent?sessionId='+this.sessionId)
          .map(res => <any[]>res); 
    }

    private serializeModels(data?: any): string {
       return data ? `&models=${JSON.stringify([data])}` : '';
    }
}
