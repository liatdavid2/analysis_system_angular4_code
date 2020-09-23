import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'table-from-server',
  templateUrl: './table-from-server.component.html',
  styleUrls: ['./table-from-server.component.scss']
})
export class TableFromServerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
