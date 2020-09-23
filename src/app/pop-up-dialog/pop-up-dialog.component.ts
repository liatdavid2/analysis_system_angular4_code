import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent implements OnInit {
  @Input() PopUpOpen: boolean;
  @Input() PopUptype:number;
  constructor() { }

  ngOnInit() {
  }

}
