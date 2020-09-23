
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { SessionsService } from 'app/shared/services/sessions.service';
import { concat } from 'rxjs/observable/concat';
import { SharedService } from 'app/shared/services/SharedService.service';
import { Session } from 'app/shared/classes/Session';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  filterargs = {session_name: 'cluster1'}; 
  sessionId:number;
  currUserId:number;
  isLinear = false;
  @Input() stepper: any;
  
  constructor(private _SessionsService:SessionsService,
    private route: ActivatedRoute,private router:Router,private _SharedService:SharedService) {

      this._SharedService.currCluster.subscribe((res: any) => {
        console.log("value",res)
        this.currUserId=res
      })
     this.currUserId =this.route.snapshot.params['UserId']
    //constructor call one to get getSession from db
   // _StartPageService.getSession(1);
   }
 @Input() sessions:Observable< Session[]>;
  selectedClustersName:String="";




  //----------------AddNewSessionDialog---------------------//
  public AddNewSessionDialogOpened= false;

  public AddNewSessionDialogClose() {
    this.AddNewSessionDialogOpened = false;
  }

  public AddNewSessionDialogOpen() {
    this.AddNewSessionDialogOpened = true;
  }
  public AddNewSessionDialogSubmit(sessionTextBox,event) {
    this.AddNewSessionDialogClose();

    this.currSession={sessionid:0,session_name:sessionTextBox.value,
      USERID:this.currUserId,SessionImage:""}
   this.sessions= this._SessionsService.AddSession(this.currSession);
  
 
  }
//----------------RenameSessionDialog---------------------//
  public RenameSessionDialogOpened = false;

  public RenameSessionDialogClose() {
    this.RenameSessionDialogOpened = false;
  }
  public RenameSessionDialogOpen(session){
    this.currSession=session
    this.RenameSessionDialogOpened = true;
  }
  public RenameSessionDialogCloseSubmit(sessionTextBox,event) {
   this.RenameSessionDialogClose();
   this.sessions= this._SessionsService.UpdateSessionName(sessionTextBox.value,this.currSession.sessionid,this.currSession);
      
  }


  currSession:Session;



  AddClustersToSession(session){
    this.currSession=session;
    this._SharedService.currSession.emit(this.currSession.sessionid);
    this.stepper.next();
  }

 
  self:any=this;
  DeleteSession(session){
    this.sessions= this._SessionsService.deleteSessionById(session.sessionid);
  }

  
 ngOnInit() {
    //load all user sessions from db 
     this.sessions=  this._SessionsService.getSessions(this.currUserId );
  }
//StartEdit session
  StartEdit(session){
    this.currSession=session;    
    this._SharedService.currSession.emit(this.currSession.sessionid);
    this.router.navigate(['dashboard',{currSession:this.currSession.sessionid} ]);

  }

}
