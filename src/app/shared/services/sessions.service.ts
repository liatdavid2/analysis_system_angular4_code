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
import { Session } from 'app/shared/classes/Session';

@Injectable()


export class SessionsService {

  constructor(private _httpService: Http) {

        
  }

  sessions:Session[];

  UpdateSessionName(sessionNewName:string,sessionId:number,currSession:Session):Observable<Session[]>{
    let data = new URLSearchParams();

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this._httpService.put('http://localhost:60985/api/session?SessionId='+sessionId, 
    JSON.stringify(sessionNewName), options )
    .map((res) => { 
      this.sessions.filter(person => person.sessionid == sessionId)[0].session_name=sessionNewName;
      //currSession.session_name=sessionNewName;
     // console.log(currSession)
      return this.sessions
    }
  
  )
    .catch((e: any) => Observable.throw(this._errorHandler(e)));

  }
  getSessions(userId:number):Observable<any[]>{
    return this._httpService.get('http://localhost:60985/api/session?userid='+userId)   
    .map((response: Response) => {
      this.sessions=<any[]>response.json();
     // localStorage.setItem('clustersList', JSON.stringify(response)); 
      return <any[]>response.json();})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));
  }
  AddSession(Session:Session):Observable<Session[]>{
    let data = new URLSearchParams();

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify(SessionName);
    //data.append('points', JSON.stringify(SessionName));

  //console.log(body);
 
    return this._httpService.post('http://localhost:60985/api/session', 
    JSON.stringify(Session), options )
    .map((response: Response) => { 
      this.sessions.push(<Session>response.json()) ;
        return this.sessions})
    .catch((e: any) => Observable.throw(this._errorHandler(e)));

  }

deleteSessionById(Sessionid:number){

  return this._httpService.delete('http://localhost:60985/api/session?sessionId='+Sessionid)   
  .map((response:any) => {

    return this.sessions.filter(person => person.sessionid != Sessionid);})
  .catch((e: any) => Observable.throw(this._errorHandler(e)));
}
_errorHandler(error: Response) {
  console.error(error);//need instead log file with errors console.log
  return Observable.throw(error || "server Error");//throw exeption to employee list and employee details

}


}