import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/throw';
//import { kid } from "../../shared/models/kid";
//import { KidDetailes } from "../../shared/models/KidDetailes";
import { URLSearchParams, RequestOptions, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { TableRow } from '../classes/TableRow';
import { take } from 'rxjs/operator/take';
import { Options } from 'selenium-webdriver/firefox';
@Injectable()
export class Tableservice {

  constructor(private _httpService: Http) {

        
  }

  filterFromServer(ClusterID:number,start:number,end:number,filters:any[]): Observable<any[]>
  {
    let data=new URLSearchParams()
    let headers=new Headers({'Content-Type':'application/json; charset=utf-8'})
    let Options=new RequestOptions({headers:headers})
   //let body=JSON.stringify(filters)

    data.append('filters',JSON.stringify(filters))
      return this._httpService.put('http://localhost:60985/api/Table?ClusterId='+ClusterID+
    '&start='+start+ '&end='+end,filters,Options)   
          .map((response: Response) => { return <any[]>response.json();})
          .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }
  GetTableByClusterIdStartEnd(ClusterID:number,start:number,end:number): Observable<any[]>
  {
  
      return this._httpService.get('http://localhost:60985/api/Table?ClusterId='+ClusterID+
    '&start='+start+ '&end='+end)   
          .map((response: Response) => { return <any[]>response.json();})
          .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }
  //grab all Users
getsimpleTableData(): Observable<TableRow[]>
//Observable<user[]> - for readbilty -another developer can see the type in that way
// in app.componenet.ts getusers() you can see  the type if hover in visual code
{
  // this._httpService.get('http://localhost:63155/api/Rentals').subscribe(res => {
    //return this._httpService.get('assets/jsonData/TableDataApi.json')
    return this._httpService.get('http://localhost:60985/api/Table')

//	return this._httpService.get('http://localhost:60985/api/Table?start='+skip + '&&end=skip_pageSize')
	
        .map((response: Response) => { return <TableRow[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
        //.catch(this._errorHandler);
}

//grab all Users
getTableData(skip:number,take:number): Observable<TableRow[]>
//Observable<user[]> - for readbilty -another developer can see the type in that way
// in app.componenet.ts getusers() you can see  the type if hover in visual code
{
  // this._httpService.get('http://localhost:63155/api/Rentals').subscribe(res => {
    //return this._httpService.get('assets/jsonData/TableDataApi.json')
    return this._httpService.get('http://localhost:60985/api/Table?start='+skip+'&&end='+take)

//	return this._httpService.get('http://localhost:60985/api/Table?start='+skip + '&&end=skip_pageSize')
	
        .map((response: Response) => { return <TableRow[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
        //.catch(this._errorHandler);
}

getBigTableData(): Observable<any>

{
    return this._httpService.get('http://localhost:60985/api/Table100kData')
	
        .map((response: Response) => { return <any>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
}

getReuseDataTableData(): Observable<TableRow[]>

{
    return this._httpService.get('http://localhost:60985/api/Table')

	
        .map((response: Response) => { return <TableRow[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
}



_errorHandler(error: Response) {
  console.error(error);//need instead log file with errors console.log
  return Observable.throw(error || "server Error");//throw exeption to employee list and employee details

}


}