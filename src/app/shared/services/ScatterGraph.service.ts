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
@Injectable()
export class ScatterGraphService {

  constructor(private _httpService: Http) {

        
  }

  getPolygon(points:number[]): Observable<any[]>
 {
  let data = new URLSearchParams();

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(points);
    data.append('points', JSON.stringify(points));

  console.log(body);
    return this._httpService.post('http://localhost:60985/api/Graph/GetLassoPolygonPoints', points, options )
    .map((response: Response) => { return <any[]>response.json();})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  

}
getXYGraphByCluster_startEnd(start:number,end:number): Observable<any[]>
{
    let data = [],
    n = 100000,
    i;
for (i = 0; i < n; i += 1) {
    data.push([
        i,
        i
    ]);
}
   let d = Observable.create((observer) => {observer.next(data)})
   return d;
}
getDataFromQueryFromClusterID(ClusterID:number): Observable<any[]>
{

    return this._httpService.get('http://localhost:60985/api/Graph?ClusterId='+ClusterID)   
        .map((response: Response) => { return <any[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
}

//grab all Users
getData(): Observable<any[]>
//Observable<user[]> - for readbilty -another developer can see the type in that way
// in app.componenet.ts getusers() you can see  the type if hover in visual code
{
 // this._httpService.get('http://localhost:63155/api/Rentals').subscribe(res => {
    //return this._httpService.get('assets/jsonData/GraphDataApi.json')
    return this._httpService.get('http://localhost:60985/api/Graph')   
        .map((response: Response) => { return <any[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
}

getYData(): Observable<any[]>
//Observable<user[]> - for readbilty -another developer can see the type in that way
// in app.componenet.ts getusers() you can see  the type if hover in visual code
{
 // this._httpService.get('http://localhost:63155/api/Rentals').subscribe(res => {
    //return this._httpService.get('assets/jsonData/GraphDataApi.json')
    return this._httpService.get('http://localhost:60985/api/Graph?AxisToget=1')   
        .map((response: Response) => { return <any[]>response.json();})
        .catch((e: any) => Observable.throw(this._errorHandler(e)));
}

_errorHandler(error: Response) {
  console.error(error);//need instead log file with errors console.log
  return Observable.throw(error || "server Error");//throw exeption to employee list and employee details

}


}