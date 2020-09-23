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
import { CLUSTER } from 'app/shared/classes/cluster';
@Injectable()


export class ClustersService {
  public userData: any;
  public userToken: any;
  public userJson:any;
  constructor(private _httpService: Http) {

        
  }

  ClusertsWithoutParent:CLUSTER[];

  UpdateClusterName(ClusterNewName:string,currCluster:CLUSTER):Observable<any>{
    let data = new URLSearchParams();

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this._httpService.put('http://localhost:60985/api/clusterWithoutParent?ClusterId='+currCluster.CLUSTERID, 
    JSON.stringify(ClusterNewName), options )
    .map((res) => { 
      //this.sessions.filter(person => person.sessionid == sessionId)[0].session_name=sessionNewName;
      //currSession.session_name=sessionNewName;
     // console.log(currSession)
     // return this.sessions
     //currCluster={...currCluster,CLUSTER_NAME:ClusterNewName}
    // console.log(currCluster)

    this.ClusertsWithoutParent.filter(person => person.CLUSTERID == currCluster.CLUSTERID)[0]
    .CLUSTER_NAME=ClusterNewName;
    //currSession.session_name=sessionNewName;
   // console.log(currSession)
    return this.ClusertsWithoutParent;
     //return currCluster;
    }
  
  )
    .catch((e: any) => Observable.throw(this._errorHandler(e)));

  }

  deleteClusterById(Clusterid:number){

    return this._httpService.delete('http://localhost:60985/api/clusterWithoutParent?clusterId='+Clusterid)   
    .map((response:any) => {
     let indexDelete= this.ClusertsWithoutParent.findIndex(cluster => cluster.CLUSTERID == Clusterid);
      this.ClusertsWithoutParent.splice(indexDelete, 1);  
      return this.ClusertsWithoutParent.filter(cluster => cluster.CLUSTERID != Clusterid);})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }
  
 /* deleteClusterById(Clusterid:number){
    return this._httpService.delete('http://localhost:60985/api/clusterWithoutParent?clusterId='+Clusterid)   
    .map((response: Response) => {
      return true;})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }*/

  AddClustersParentSessionId(newSessionId:number,clusterIds:number[]):Observable<any[]>{
    let data = new URLSearchParams();

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this._httpService.put('http://localhost:60985/api/clusterWithoutParent?newSessionId='+newSessionId
    ,JSON.stringify(clusterIds) ,options
  )   
    .map((response: Response) => {
     // localStorage.setItem('clustersList', JSON.stringify(response)); 
      return <any[]>response.json();})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }


  getClusertsWithParent(ParentrSessionId:number):Observable<CLUSTER[]>{
    return this._httpService.get('https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv'
    )   
    .map((response: Response) => {
      console.log(response)
      const list = response.text.toString()
      .split('\n');
      list.forEach( e => {
      console.log(e)
});
     // localStorage.setItem('clustersList', JSON.stringify(response)); 
      return <CLUSTER[]>response.json();})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }

  //ClusertsWithoutParent -> sessionId=0
  getClusertsWithoutParent():Observable<CLUSTER[]>{
    return this._httpService.get('http://localhost:60985/api/clusterWithoutParent')   
    .map((response: Response) => {
      this.ClusertsWithoutParent=<CLUSTER[]>response.json();
     // localStorage.setItem('clustersList', JSON.stringify(response)); 
      return <CLUSTER[]>response.json();})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }
  getSessionFromLocalStorage(sessionId:number):any[]{

    console.log('getSessionFromLocalStorage',JSON.parse(localStorage.getItem('clustersList')))


   this.userData = localStorage.getItem("clustersList");
   this.userJson = JSON.parse(this.userData);

   if(this.userJson != null) {

       this.userJson = JSON.parse(this.userData);
       this.userToken= this.userJson.token;
     //  alert(this.userToken);
      return JSON.parse(this.userJson._body);
   }

  }

_errorHandler(error: Response) {
  console.error(error);//need instead log file with errors console.log
  return Observable.throw(error || "server Error");//throw exeption to employee list and employee details

}


}