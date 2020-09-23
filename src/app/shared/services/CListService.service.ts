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
export class CListService {

  constructor(private _httpService: Http) {


  }

  url:string='http://localhost:63155/api/ClustersList';

  //grab all Users
  getData(): Observable<any[]>
  //Observable<user[]> - for readbilty -another developer can see the type in that way
  // in app.componenet.ts getusers() you can see  the type if hover in visual code
  {
    // this._httpService.get('http://localhost:63155/api/ClustersList').subscribe(values => {
      //this._httpService.get('http://localhost:54008/api/values').subscribe(values => {
        /*this._httpService.get('http://localhost:60985/api/CList').subscribe(values => {
       
    console.log(values.json());
  });*/

    return this._httpService.get('assets/jsonData/CListDataApi.json')
    //return this._httpService.get('http://localhost:60985/api/CList')
      .map((response: Response) => { return <any[]>response.json(); })
      .catch((e: any) => Observable.throw(this._errorHandler(e)));
    //.catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    console.error(error);//need instead log file with errors console.log
    return Observable.throw(error || "server Error");//throw exeption to employee list and employee details

  }

  //get a single ListItem
  getOneListItem(id: number){
    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  JSON.stringify(id));

    return this._httpService.get(this.url, {
      search: params
    })     
     .subscribe(res => {
      alert('getOneListItem ok');
    }, error => {
      console.log(error.json());
    });

  }
  //putOneListItem(id: number, _kid: kid)
  putOneListItem(id: number)
  {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let url = `${this.url}/${id}`;
      let opts: RequestOptionsArgs = { headers: headers };
      return this._httpService
          .put(url, opts)
       .subscribe(data => {
        alert('putOneListItem ok ');
      }, error => {
          console.log(error.json());
      });
  }
  deleteListItem(id: number) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify(id));

    let data = new URLSearchParams();
    //data.append('KidName', _kid.KidName);
    data.append('id', JSON.stringify(id));

    return this._httpService.delete(this.url,  { search: params}
    )
        .subscribe(data => {
            alert('delete ok'+params);
        }, error => {
            console.log(error.json());
        });

        
 }
  PostKidDetails() {
    let data = new URLSearchParams();
    //data.append('KidName', _kid.KidName);
    data.append('PhoneOne', JSON.stringify(100));
    //data.append('PhoneTwo', JSON.stringify(_kid.PhoneTwo));
    this._httpService
      .post('http://localhost:63155/api/ClustersList', data)
      .subscribe(res => {
        alert('post ok');
      }, error => {
        console.log(error.json());
      });
  }

}