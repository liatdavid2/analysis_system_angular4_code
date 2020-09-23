import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var nicEditors: any;
declare var $: any;
@Component({
  selector: 'report-nice-edit',
  templateUrl: './report-nice-edit.component.html',
  styleUrls: ['./report-nice-edit.component.scss']
})
export class ReportNiceEditComponent implements OnInit {
  @ViewChild('text') text: ElementRef;
  constructor() { }
  //get report from server - in html format
  loadReportFromHtml(){
    var nicE = new nicEditors.findEditor('textEditor');
    nicE.setContent(this.savedHtmlContent);
  }
  savedHtmlContent:any;

  //save report to server - save to html and to db
  saveReport(){
    console.log(this.text) 
    var nicE = new nicEditors.findEditor('textEditor');
    this.savedHtmlContent = nicE.getContent();

  console.log(this.savedHtmlContent)
  }
  ngOnInit() {
    nicEditors.allTextAreas() ;
    
   console.log($(this.text.nativeElement).html()) 
  }

}
